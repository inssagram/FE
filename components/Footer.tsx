import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faFilm, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 49px;
  padding: 0 16px;
  border-top: 1px solid #e2e2e2;
  position: absolute;
  bottom: 0;
  background-color: #fff;
`;

const IconPannels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Icon = styled.div`
  padding: 12px;
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <IconPannels>
        <Icon>
          <Link href="/">
            <FontAwesomeIcon icon={faHouse} fontSize={"24px"} />
          </Link>
        </Icon>
        <Icon>
          <Link href="/explore">
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"24px"} />
          </Link>
        </Icon>
        <Icon>
          <Link href="/">
            <FontAwesomeIcon icon={faFilm} fontSize={"24px"} />
          </Link>
        </Icon>
        <Icon>
          <Link href="/direct">
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"24px"} />
          </Link>
        </Icon>
        <Icon>
          <Link href="/my">
            <FontAwesomeIcon icon={faUser} fontSize={"24px"} />
          </Link>
        </Icon>
      </IconPannels>
    </Container>
  );
};

export default Footer;
