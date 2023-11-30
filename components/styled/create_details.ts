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

export const ModalFilter = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
  left: 0;
  top: 0;
`

export const Modal = styled.div`
  width: 90%;
  height: 50%;
  background-color: white;
  border-radius: 20px;
`

export const ModalHead = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: black;
  border-radius: 20px 20px 0 0;
  color: white;
  font-size: 16px;
  padding: 0 15px;
`

export const ModalTitle = styled.h3`
  padding-left: 15px;
`

export const ModalPost = styled.button`
  background-color: transparent;
  border: none;
  color: #0095f6;
`

export const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  color: gainsboro;
  font-size: 30px;
  position: relative;
`

interface isImagesModalProps {
  isImagesModal: boolean 
}

export const EditButton = styled.button<isImagesModalProps>`
  position: absolute;
  font-size: 15px;
  bottom: 5%;
  right: 5%;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: rgba(0,0,0,0.5);
  border: none;
  z-index: 10;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  opacity: ${(props) => props.isImagesModal ? 0.2 : 1};
`


export const ImagesModal = styled.div`
  padding: 20px 10px;
  width: 60%;
  height: 40%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  bottom: 15%;
  right: 5%;
  border-radius: 20px;
  display: flex;
`

export const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  font-size: 20px;
  border: none;
  position: absolute;
  z-index: 10;
  background-color: transparent;
  right: 0;
  top: 0;
`


interface SlideProps{
  slideProps: number
}

export const ImagesList = styled.ul<SlideProps>`
  display: flex;
  gap: 20px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => props.slideProps * (-140)}px);
  transition: 0.3s ease-in-out;
`

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const ImageBox = styled.li`
  flex-shrink: 0;
  border-radius: 20px;
  width: 80%;
  height: 80%;
  position: relative;
`

export const AddButton = styled.button`
  width: 30%;
  height: 100%;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15px;
  background-color: transparent;
  border: none;
`

export const LeftButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
`
export const RightButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
  right: 30%;
`