import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  color: black;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 100%;
  min-height: 670px;
`;

export const Article = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
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

export const ContentsDate = styled.div`
  position: absolute;
  top: 10%;
  left: 16%;
  color: grey;
`;

export const CommentCont = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserCont = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserId = styled.div`
  margin: 0.5rem 0.5rem 0.5rem;
  width: 18%;
`;

export const WriteReply = styled.span`
  width: 50%;
  padding-left: 3.8rem;
  color: darkgray;
`;

export const AllComment = styled.div`
  color: darkgray;
  margin-top: 1rem;
  position: relative; // relative positioning을 추가합니다.
  padding-left: 7rem;

  &::before {
    content: "";
    position: absolute;
    left: 15%; // 이 값을 0으로 변경하세요
    top: 50%;
    transform: translateY(-50%);
    height: 1px;
    width: 15px;
    background-color: darkgrey;
  }
`;

export const UserComment = styled.span`
  color: gray;
  margin: 0 0 1rem 0;
  width: 100%;
  padding-left: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CommentsDate = styled.p`
  color: gray;
`;
export const CommentsContainer = styled.div`
  width: 100%;
  height: 8vh;
  border-top: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

export const CommentsForm = styled.form`
  width: 100%;
  position: relative;
  padding-left: 1rem;
`;

export const CommentsInput = styled.input`
  width: 95%;
  height: 4vh;
  border-radius: 10px;
  padding-left: 0.5rem;
`;
export const SmileIcon = styled.div`
  position: absolute; // 이를 absolute로 설정합니다.
  right: 10%; // 오른쪽에서 5px 떨어지게 설정합니다.
  top: 50%; // 상위 컨테이너의 중앙에 위치시킵니다.
  transform: translateY(
    -50%
  ); // Y축을 중심으로 이를 조정하여 아이콘을 완벽하게 중앙에 위치시킵니다.
`;

// modal창

export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  top: 0;
  width: 412px;
  margin: -12px;
  background-color: black;
  opacity: 0.9;
  z-index: 9;
`;

export const ModalContent = styled.div`
  height: 110px;
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ModalText = styled.span`
  font-size: 1.5rem;
  color: white;
`;

export const ModalButtons = styled.div`
  width: 324px;
  height: 96px;
  margin-top: 3rem;
`;

export const DeleteButton = styled.button`
  width: 200px;
  height: 48px;
  background-color: #0095f6; /* 삭제 버튼 배경색 변경 */
  color: white; /* 텍스트 색상 변경 */
  border: none;
  border-radius: 8px; /* 둥근 테두리 설정 */
  margin-bottom: 10px; /* 버튼 간 간격 지정 */
  cursor: pointer;
  border-radius: 16px;
`;

export const CancelButton = styled.button`
  width: 200px;
  height: 48px;
  background-color: #e5e5e5; /* 취소 버튼 배경색 변경 */
  color: black; /* 텍스트 색상 변경 */
  border: none;
  border-radius: 8px; /* 둥근 테두리 설정 */
  cursor: pointer;
  border-radius: 16px;
`;
