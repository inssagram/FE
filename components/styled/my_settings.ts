import styled from "styled-components";

export const Header = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
  color: black;
  border-bottom: 1px solid #e2e2e2;
  font-size: 15px;
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

export const Category = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: gainsboro;
  color: black;
  border-bottom: 1px solid #e2e2e2;
  font-size: 15px;
  padding-left: 10px;
`;

export const Lists = styled.ul`
  width: 100%;
`

export const List = styled.li`
  width: 100%;
  height: 44px;
  font-size: 15px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid gainsboro;
  justify-content: space-between;
  padding: 0 10px;
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: black;
`

export const Logout = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: gainsboro;
  color: red;
  border-bottom: 1px solid #e2e2e2;
  font-size: 15px;
  padding-left: 10px;
  position: absolute;
  bottom: 7%;
`;

export const Unregister = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: gainsboro;
  color: red;
  border-bottom: 1px solid #e2e2e2;
  font-size: 15px;
  padding-left: 10px;
  position: absolute;
  bottom: 0;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  text-align: center;
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }

  button:nth-child(1) {
    background-color: #db4437;
    color: white;
  }

  button:nth-child(2) {
    background-color: #fafafa;
    color: #333;
  }
`;