import { Player, PlayerProps, PlayerRef } from "@remotion/player";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const className = "__player";
const borderNone = {
  border: "none",
  width: "100%",
  height: "100%",
};

const IframePlayerWithoutRef = (props, ref) => {
  const [contentRef, setContentRef] = useState(null);
  const resizeObserverRef = useRef(null);
  const mountNode = contentRef?.contentDocument?.body;

  useEffect(() => {
    if (!contentRef || !contentRef.contentDocument) return;

    contentRef.contentDocument.body.style.margin = "0";
    contentRef.contentDocument.body.style.padding = "0";
    contentRef.contentDocument.body.style.display = "flex";
    contentRef.contentDocument.body.style.justifyContent = "center";
    contentRef.contentDocument.body.style.alignItems = "center";
    contentRef.style.width = "100%";
    contentRef.style.height = "100%";

    const playerElement = contentRef.contentDocument.querySelector(
      `.${className}`
    );
    if (!playerElement) {
      throw new Error(
        `Player element not found. Add a "${className}" class to the <Player>.`
      );
    }

    resizeObserverRef.current = new ResizeObserver(([playerEntry]) => {
      const playerRect = playerEntry.contentRect;
      contentRef.width = String(playerRect.width);
      contentRef.height = String(playerRect.height);
    });

    resizeObserverRef.current.observe(playerElement);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(playerElement);
      }
    };
  }, [contentRef]);

  const combinedClassName = `${className} ${props.className ?? ""}`.trim();

  return (
    <iframe ref={setContentRef} style={borderNone}>
      {mountNode &&
        ReactDOM.createPortal(
          <Player {...props} ref={ref} className={combinedClassName} />,
          mountNode
        )}
    </iframe>
  );
};

export const IframePlayer = forwardRef(IframePlayerWithoutRef);
