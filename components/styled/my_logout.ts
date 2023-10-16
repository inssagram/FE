import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 915px;
  background-color: aliceblue;
`;

export const Notification = styled.div`
  width: 412px;
  height: 70vh;
  background-color: antiquewhite;
  padding-top: 80px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  width: 50%;
  font-size: 3rem;
  text-align: center;
  margin: 2rem 0 2rem 0;
`;

export const Promotion = styled.span`
  font-size: 2rem;
  text-align: center;
  line-height: 3rem;
  padding-bottom: 2rem;
`;

export const Emphasis = styled.span`
  color: #ff0169;
`;

export const DownButton = styled.button`
  width: 332px;
  height: 44px;
  border-radius: 8px;
  background: #0095f6;
  color: white;
  border-style: none;
`;

export const LoginButton = styled.button`
  width: 332px;
  height: 44px;
  border-radius: 8px;
  background: white;
  color: #737373;
  border-style: none;
  margin-top: 2rem;
`;

export const BlueEmphasis = styled.span`
  color: #0095f6;
`;
