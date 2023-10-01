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
  background-color: #ffffff;
  color: #222222;
  z-index: 10;
  border-bottom: 1px solid #e2e2e2;
`;

export const H1 = styled.h1`
  font-size: 1.3rem;
  color: black;
  font-weight: lighter;
  margin-left: 45%;
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
  position: absolute; // 추가
  left: 5%; // 추가
`;

export const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  color: black;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

// ----------------------------------------------------------------------------

export const Article = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
// ----------------------------------------------------------------------------

export const Head = styled.div`
  width: 100%;
  flex: 0.5;
  padding: 50px 4px 14px 16px;
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  flex: 9;
  display: flex;
  align-items: center;
`;
export const ID = styled.span`
  margin-left: 12px;
`;

export const More = styled.div`
  flex: 1;
  padding: 8px;
`;

// ----------------------------------------------------------------------------

export const Contents = styled.div`
  position: relative;
`;

export const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// ----------------------------------------------------------------------------

export const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 0 1rem 0 1rem;
`;

// ----------------------------------------------------------------------------

export const Buttons = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;
export const LeftIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 50%;
  padding-right: 10px;
`;

export const RightIcon = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

// ----------------------------------------------------------------------------

export const Likes = styled.div`
  flex: 1;
`;

export const MyId = styled.div`
  flex: 1;
`;

export const Content = styled.span`
  flex: 3;
`;

export const MoreComments = styled.div`
  flex: 1;
  color: grey;
`;

export const CommentCont = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

export const BoardContents = styled.div`
  display: flex;
  flex: 1;
`;

export const UserId = styled.div`
  flex: 1;
`;

export const AllComment = styled.div`
  flex: 1;
  color: gray;
`;

export const UserComment = styled.span`
  color: gray;
  flex: 5;
`;

export const ContentsDate = styled.p`
  color: gray;
  flex: 5;
`;
