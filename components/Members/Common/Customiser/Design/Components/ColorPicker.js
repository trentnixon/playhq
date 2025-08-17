import React, { useEffect, useState } from 'react';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

// Suppress react-color defaultProps warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('defaultProps')
  ) {
    return; // Suppress defaultProps warnings
  }
  originalWarn.apply(console, args);
};

const SketchExample = ({ UsersTheme, SetColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(UsersTheme);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = color => {
    setColor(color.rgb);
    SetColor(color.rgb);
  };

  useEffect(() => {
    setColor(UsersTheme);
  }, [UsersTheme]);

  // @ts-ignore - reactCSS returns a complex object structure
  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: 2,
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      {/* @ts-ignore */}
      <div style={styles.swatch} onClick={handleClick}>
        {/* @ts-ignore */}
        <div style={styles.color} />
      </div>
      {displayColorPicker && (
        // @ts-ignore
        <div style={styles.popover}>
          {/* @ts-ignore */}
          <div style={styles.cover} onClick={handleClose} />
          {/* @ts-ignore */}
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default SketchExample;
