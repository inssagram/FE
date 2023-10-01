import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 45vh;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-top: 2px solid #e2e2e2;

  position: relative;
`;

export const Header = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  background-color: #ffffff;
  color: #222222;
  z-index: 10;
  border-bottom: 1px solid #e2e2e2;
`;

export const H1 = styled.h1`
  font-size: 1.3rem;
  color: black;
  font-weight: lighter;
`;

export const CloseBtn = styled.button`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-style: none;
  font-size: 2.5rem;
`;

export const Next = styled.span`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-style: none;
  font-size: 1.3rem;
  color: #0095f6;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const IconContainer = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
`;

export const Button = styled.button`
  width: 35px;
  height: 35px;
  background-color: #555;
  border-radius: 50%;
  border-style: none;
  color: white;
  font-size: 1.5rem;
`;

export const Footer = styled.div`
  width: 412px;
  height: 48px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 16px;
  border-top: 1px solid #e2e2e2;
  position: absolute;
  bottom: 0;
`;
export const FunctionPannels = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  font-size: 1.5rem;
`;

export const FunctionName = styled.span`
  font-size: 1.3rem;
  color: #737373;
`;
