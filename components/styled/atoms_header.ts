import styled from "styled-components";

export const Container = styled.div`
  height: 77px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 16px 16px 24px;
`;

export const Profile = styled.div`
  margin-right: 28px;
`;

export const MyDescContainer = styled.div`
  width: 275px;
  min-height: 77px;
  display: flex;
  flex-direction: column;
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Id = styled.h2`
  min-width: fit-content;
  min-height: 25px;
  font-size: 20px;
  font-weight: lighter;
  padding-right: 8px;
`;

export const Company = styled.span`
  display: flex;
  align-items: center;
  min-width: fit-content;
  color: #0095f6;
  font-weight: 600;
`;

// + MyHeader
export const EditArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ProfileEdit = styled.button`
  width: 115px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: #efefef;
`;

export const StoryEdit = styled.button`
  width: 145px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: #efefef;
`;

// + UserHeader
export const DetailArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Desc = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 16px;
  border-radius: 10px;
  width: 100%;
  height: 32px;
  font-size: 14px;
  background-color: #efefef;
`;
