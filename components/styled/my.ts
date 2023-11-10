import styled from "styled-components";

export const Container = styled.div`
  height: 77px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 16px 16px 24px 16px;
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

export const EditArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Edit = styled.button`
  width: 130px;
  height: 35px;
  border-style: none;
  border-radius: 10%;
  background-color: #efefef;
`;

export const Desc = styled.span`
  font-size: 1rem;
`;

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

export const Sentinel = styled.div`
  height: 10px;
  visibility: hidden;
`;

export const Text = styled.span`
  width: 412px;
  padding: 12px;
`;
