import styled from "styled-components";

export const Loading = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
`;

export const ContentArea = styled.section`
  width: 100%;
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  font-size: 14px;
`;

export const AccountArea = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: calc(100% - 48px);
  padding: 14px 4px 14px 16px;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Id = styled.span`
  margin-left: 12px;
  padding: 2px;
`;

export const FollowBtn = styled.button`
  border: none;
  margin-left: 18px;
  background-color: inherit;
  color: #0095f6;
`;

export const EtcIcon = styled.div`
  height: 40px;
  padding: 8px 16px 8px 8px;
`;
