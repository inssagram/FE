import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-top: 2px solid #e2e2e2;
  position: relative;
`;

export const Header = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #ffffff;
  color: #222222;
  border-bottom: 1px solid #e2e2e2;
`;

export const H1 = styled.h1`
  font-size: 1.3rem;
  color: black;
  font-weight: lighter;
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
  color: black;
`;

export const Next = styled.span`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-style: none;
  font-size: 1.3rem;
  color: #0095f6;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const MyProfile = styled.div`
  width: 10%;
  height: 38px;
  border-radius: 50%;
  background-color: aliceblue;
  margin-bottom: 10px;
`;

export const TextCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90%;
  bottom: 35%;
  left: 20%;
  font-size: 1.5rem;
`;

export const Textarea = styled.textarea`
  border-style:none;
  background-color: transparent;
  color: black;
  width: 70%;
  height: 100%;
  font-size: 14px;
  &:focus{
    border: none;
    outline: none;
  }
  &::placeholder {
    font-family: JejuGothic;
  }
  padding: 5px 0 0 5px;
  margin-bottom: 10px;
`;

export const Text = styled.span`
`;

export const PicCon = styled.div`
  position: absolute;
  display: flex;
  right: 7%;
  top: 30%;
`;

export const FunctionPannels = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 0 16px;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  margin: 1rem 0 1rem 0;
  color: black;
`;

export const Button = styled.button`
  border-style: none;
  background-color: transparent;
  color: black;
`;
