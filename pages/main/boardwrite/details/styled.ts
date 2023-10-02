import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 20vh;
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

export const Prev = styled.button`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-style: none;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  padding: 0;
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

export const MyProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  bottom: 45%;
  background-color: aliceblue;
`;

export const TextCont = styled.div`
  position: absolute;
  width: 80%;
  height: 51px;
  bottom: 35%;
  left: 20%;
  font-size: 1.5rem;
`;

export const Text = styled.span``;

export const PicCon = styled.div`
  position: absolute;
  display: flex;
  right: 7%;
  top: 30%;
`;

export const FunctionPannels = styled.div`
  width: 100%;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 0 16px;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  margin: 1rem 0 1rem 0;
`;

export const Button = styled.button`
  width: 20%;
  border-style: none;
  background-color: transparent;
`;
