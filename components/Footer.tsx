import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faFilm, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  width: 412px;
  height: 48px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 16px;
  border-top: 1px solid #e2e2e2;
  background-color: white;
  position: absolute;
  bottom: 0;
`;
const IconPannels = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  font-size: 1.5rem;
`;
const Footer: React.FC = () => {
  return (
    <Container>
      <IconPannels>
        <FontAwesomeIcon icon={faHouse} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <FontAwesomeIcon icon={faFilm} />
        <FontAwesomeIcon icon={faPaperPlane} />
        <FontAwesomeIcon icon={faUser} />
      </IconPannels>
    </Container>
  );
};

export default Footer;
