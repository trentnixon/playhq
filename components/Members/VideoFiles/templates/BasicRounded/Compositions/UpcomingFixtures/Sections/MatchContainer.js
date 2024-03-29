
import styled from 'styled-components';
const MatchContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom:130px;
`;

export const MatchContainer = (props)=>{
  return(<MatchContainerStyles>{props.children}</MatchContainerStyles>)
}
