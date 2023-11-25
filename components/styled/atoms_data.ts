import Link from "next/link";
import styled from "styled-components";

export const MyDataContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 12px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const MyDataValue = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  font-size: 2rem;
`;

export const DataName = styled.span`
  font-size: 1.1rem;
`;

export const DataValue = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

export const IconContainer = styled.div`
  position: sticky;
  top: 44px;
  left: 0;
  width: 100%;
  height: 44px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;
  border-bottom: 2px solid #ccc;
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
  top: 50%;
  right: 50%;
`;

export const Text = styled.span`
  width: 412px;
  padding: 12px;
`;
