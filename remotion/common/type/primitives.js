import React from 'react';
import styled from 'styled-components';

// EXPORTS
export const P = props => {
  return <Paragraph {...props}>{props.children}</Paragraph>;
};

export const H = ({ level, ...props }) => {
  const tag = `h${level}`;
  return <Heading tag={tag} {...props} />;
};

// PRIMITIVES
const Paragraph = styled(
  ({
    color,
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,
    margin,
    padding,
    textTransform,
    maxWidth,
    minWidth,
    marginLeft,
    ...rest
  }) => <p {...rest} />
).attrs(props => ({
  style: {
    color: props.color || 'white',
    fontSize: props.fontSize || '1rem',
    fontWeight: props.fontWeight || '200',
    lineHeight: props.lineHeight || '1.5',
    textAlign: props.textAlign || 'left',
    margin: props.margin || '0',
    padding: props.padding || '0',
    textTransform: props.textTransform,
    maxWidth: props.maxWidth,
    minWidth: props.minWidth,
    marginLeft: props.marginLeft,
    // Add other dynamic styles here
  },
}))``;

const Heading = styled(
  ({
    tag,
    color,
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,
    margin,
    padding,
    fontFamily,
    textTransform,
    maxWidth,
    minWidth,
    marginLeft,
    ...rest
  }) => React.createElement(tag, rest)
).attrs(props => ({
  style: {
    color: props.color || 'black',
    fontSize: props.fontSize || '2rem',
    fontWeight: props.fontWeight || '400',
    lineHeight: props.lineHeight || '1.1',
    textAlign: props.textAlign || 'left',
    margin: props.margin || '0',
    padding: props.padding || '0',
    fontFamily: props.fontFamily,
    textTransform: props.textTransform,
    maxWidth: props.maxWidth,
    minWidth: props.minWidth,
    marginLeft: props.marginLeft,
    // Add other dynamic styles here
  },
}))``;

// Exporting a generic H that can be used for any heading level
