import styled from "styled-components";

export const Header = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  background-color: transparent;
  color: #222222;
  z-index: 10;
  border-bottom: 1px solid #e2e2e2;
`;

export const body = styled.div`
  position: relative;
  width: 100%;
  height: 915px;
`;

export const H1 = styled.h1`
  font-size: 1.3rem;
  color: black;
  font-weight: lighter;
`;

export const Prev = styled.button`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-style: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const IconPannels = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
`;

export const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 100px;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 1.5rem;
  text-shadow: 2px 2px 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
