import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  color: #222;
  background-color: #fff;
  // color: #fff;
  // background-color: #000;
`;

export const ExploreTop = styled.div`
  padding: 10px 16px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  row-gap: 1px;
  margin-bottom: 10px;
`;

export const Loading = styled.div`
  position: absolute;
  top: 25%;
  right: 50%;
`;
