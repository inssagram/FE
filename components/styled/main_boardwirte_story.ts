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
  background-color: transparent;
  color: #222222;
  z-index: 10;
  border-bottom: 1px solid #e2e2e2;
`;

interface textProps {
  isTexting: boolean;
 }

export const body = styled.div<textProps>`
  position: relative;
  width: 100%;
  height: 915px;
  background-color: ${(props) => props.isTexting ? "transparent" : "rgba(0,0,0,0.5)"};
`;

export const TextArea = styled.textarea<textProps>`
  position: absolute;
  display: ${(props) => props.isTexting ? "inline" : "none"};
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  border: none;
  font-size: 20px;
  top: 20%;
  left: 50%;
  &:focus{
    border: none;
    outline: none;
  }
`

export const TextBox = styled.span`
  position: absolute;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  border: none;
  font-size: 20px;
`


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
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const IconPannels = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
  position: relative;
`;

export const UploadBox = styled.div`
  position: relative;
`

export const Empty = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
`

export const HiddenInput = styled.input.attrs({
  type: "file",
  accept: "image/*",
})`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

export const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 100px;
  text-align: center;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  text-align: center;
  background-color: transparent;
  border: none;
  font-weight: bold;
  color: white;
  font-size: 1.5rem;
  text-shadow: 2px 2px 1px black;
  display: flex;
  align-items: center;
`