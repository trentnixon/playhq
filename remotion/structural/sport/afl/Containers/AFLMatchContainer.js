
import styled from 'styled-components';
const MatchContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom:${props=>props.MarginBottom || 60}px;
`;

export const AFLMatchContainer = (props)=>{
  return(<MatchContainerStyles MarginBottom={props.MarginBottom} >{props.children}</MatchContainerStyles>)
} 
