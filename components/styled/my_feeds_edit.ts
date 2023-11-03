import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const H1 = styled.h1`
  font-size: 1.3rem;
  color: black;
  font-weight: lighter;
  text-align: center;
  margin: 0;
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

export const Next = styled.button`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-style: none;
  font-size: 1.3rem;
  color: #0095f6;
  display: flex;
  align-items: center;
  padding: 0;
  right: 0;
  position: absolute;
`;

export const Container = styled.section`
  background-color: white;
  width: 80%;
  max-width: 400px;
  padding: 20px 20px 150px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
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
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
  height: auto;
  min-height: 12vh;
  margin-top: 2rem;
`;

export const Profile = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const FunctionFannels = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 5%;
  justify-content: space-evenly;
  align-items: center;
`;

export const Button = styled.button`
  width: 3rem;
  height: 3rem;
  border-style: none;
  background-color: #333;
  border-radius: 50%;
  color: whitesmoke;
`;

export const Text = styled.span`
  font-size: 1rem;
  color: white;
  margin-left: -5rem;
`;

export const UserInput = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  border-style: none;
`;

export const ID = styled.span`
  flex: 1.8;
  margin-left: 12px;
  position: relative;
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
`;

// ----------------------------------------------------------------------------

export const Content = styled.span`
  flex: 4;
  color: #555;
`;

export const ContentsDate = styled.div`
  position: absolute;
  right: 5%;
  color: grey;
`;

export const AddLocation = styled.span`
  position: absolute;
  top: 20%;
  left: 26%;
  color: #0095f6;
`;

export const UserCont = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserId = styled.div`
  margin: 0.5rem 0.5rem 0.5rem;
  width: 18%;
`;
