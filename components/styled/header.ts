import styled from "styled-components";

export const Container = styled.div`
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

export const Title = styled.h1`
  font-size: 25px;
`;

export const IconPannels = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const PlusBtn = styled.button`
  border-style: none;
  background-color: transparent;
  padding: 12px;
  color: black;
`;

export const HeartBtn = styled.button`
  position: relative;
  border-style: none;
  background-color: transparent;
`;

export const NotiAlarm = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 10px;
  height: 10px;
  border: 1.5px solid #fff;
  border-radius: 50%;
  color: #ffffff;
  background-color: red;
  z-index: 100;
`;

export const NotiCount = styled.span`
  padding-left: 2px;
`;

export const SpeechBubble = styled.div`
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -6px;
  top: 45px;
  height: 33px;
  min-width: 46px;
  max-width: 50px;
  padding: 5px;
  border-radius: 7px;
  background: #ff3040;
  color: #ffffff;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #ff3040;
    transform: translateX(-20%);
  }
`;
