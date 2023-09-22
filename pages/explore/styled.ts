import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: #000;
  color: #fff;
`;

export const ExploreTop = styled.div`
  padding: 10px 16px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  row-gap: 5px;
  margin-bottom: 10px;
`;

export const Loading = styled.div`
  align-items: stretch;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font: inherit;
  font-size: 100%;
  height: 48px;
  margin: 0;
  margin-top: 40px;
  padding: 0;
  position: relative;
  vertical-align: baseline;
`;
