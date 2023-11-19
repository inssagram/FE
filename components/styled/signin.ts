import styled from "styled-components";

export const Container = styled.div`
  width: 412px;
  height: 915px;
`;

export const Notification = styled.div`
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  width: 50%;
  font-size: 3rem;
  text-align: center;
  margin: 20px 0;
`;

export const LoginCont = styled.div`
  width: 258px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 12px 0;
`;

export const Id = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border-style: none;
  background-color: whitesmoke;
  padding-left: 5px;
  margin-bottom: 12px;
`;

export const Password = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border-style: none;
  background-color: whitesmoke;
  padding-left: 5px;
  margin-bottom: 12px;
  font-family: Arial, Helvetica, sans-serif;
  &::placeholder {
    font-family: JejuGothic;
  }
`;

export const FindPassword = styled.span`
  font-size: 15px;
  color: #0095f6;
  margin: 12px 0;
`;

export const Login = styled.button`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 8px;
  font-size: 1.3rem;
  color: #ffffff;
  background-color: #0095f6;
  margin-top: 15px;
`;

export const SignupArea = styled.div`
  display: flex;
  width: 258px;
  font-size: 14px;
  color: #222222;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SignUp = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 12px;
  color: #0095f6;
  font-size: 15px;
  font-weight: 600;
`;

export const DownButton = styled.button`
  width: 332px;
  height: 44px;
  border-radius: 8px;
  background: #0095f6;
  color: white;
  border-style: none;
`;

export const LoginButton = styled.button`
  width: 332px;
  height: 44px;
  border-radius: 8px;
  background: white;
  color: #737373;
  border-style: none;
  margin-top: 2rem;
`;

export const FindContainer = styled.div`
  width: 100%;
  height: 35px;
`;
