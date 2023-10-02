import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  margin: 16px;
  border-radius: 22px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const Input = styled.input`
  display: flex;
  padding-left: 10px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #222;
  background-color: transparent;
`;

const ImageIcon = styled.div`
  padding: 10px;
`;

const DirectMessage = () => {
  return (
    <>
      <Container>
        <Message>
          <Input placeholder="메시지 입력..."></Input>
          <ImageIcon>
            <FontAwesomeIcon icon={faImage} fontSize={24} />
          </ImageIcon>
        </Message>
      </Container>
    </>
  );
};

export default DirectMessage;
