import styled from "styled-components";

export const Notifications = styled.div`
  position: absolute;
  top: 44px;
  width: 100%;
  margin-top: 20px;
`;

export const Date = styled.span`
  display: inline-block;
  margin: 0 12px;
  padding-bottom: 16px;
  font-size: 16px;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding: 8px 16px;
`;
// transform: ${({ isSwiping }) =>
//   isSwiping
//     ? "translateX(-100px)"
//     : "none"}; /* Adjust the value to your preference */
// transition: transform 0.3s ease;

export const Account = styled.div`
  margin-right: 14px;
  border-radius: 100%;
`;

export const Content = styled.p`
  min-width: 266px;
  height: 36px;
  font-size: 14px;
`;

export const Board = styled.div`
  margin-left: 14px;
`;

export const DeleteIcon = styled.button`
  border: none;
  background-color: transparent;
  padding: 0 7px;
`;

export const Follow = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 82px;
  min-height: 32px;
  font-size: 14px;
  margin-left: 12px;
  padding: 7px 16px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  background-color: #0095f6;
`;
