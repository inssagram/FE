import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
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
export const HeaderCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  margin-top: 0.6rem;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 20vh;
  background-color: white;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  border-top: 2px solid #e2e2e2;
`;

export const MyProfile = styled.div`
  width: 77px;
  height: 77px;
  position: relative;
  border-radius: 50%;
  background-color: antiquewhite;
  display: flex;
  margin-top: 44px;
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column; // 세로로 아이템을 배열
  align-items: center; // 가운데 정렬
`;

export const MyIdContainer = styled.section`
  width: 300px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const MyIdGroup = styled.div`
  width: 95%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 15px 0 15px;
`;

export const ProfileEdit = styled.button`
  width: 138px;
  height: 35px;
  border-radius: 10%;
  background-color: #efefef;
  border-style: none;
`;

export const ProfileBox = styled.span`
  font-size: 1rem;
`;

export const UserName = styled.span`
  margin-top: 0.6rem;
  color: black;
  font-weight: bold;
`;

export const UserId = styled.h1`
  font-size: 1.7rem;
  margin: 1rem 0 1rem 1.5rem;
  font-weight: lighter;
`;

export const MyDataContainer = styled.div`
  width: 100%;
  height: 62px;
  background-color: cadetblue;
  justify-content: space-evenly;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid #e2e2e2;
`;

export const MyDataValue = styled.div`
  width: 100px;
  height: 40px;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const DataName = styled.span`
  font-size: 1.1rem;
  color: #222222;
`;

export const DataValue = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

export const IconContainer = styled.div`
  width: 100%;
  height: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;
  border-bottom: 2px solid #e2e2e2;
`;

export const FeedViewCon = styled.div`
  width: 100%;
  height: 63vh;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(3, 136px);
  grid-template-rows: repeat(4, 136px);
  gap: 10px;
  justify-content: center;
  align-content: center;
`;

export const Feed = styled.div`
  width: 136px;
  height: 136px;
  background-color: yellow;
`;
