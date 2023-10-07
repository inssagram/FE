import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faFilm,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as SC from "../components/styledFooter";

const Footer: React.FC = () => {
  return (
    <SC.Footer>
      <SC.IconPannels>
        <Link href="/">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link href="/explore">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
        <Link href="/">
          <FontAwesomeIcon icon={faFilm} />
        </Link>
        <Link href="/direct">
          <FontAwesomeIcon icon={faPaperPlane} />
        </Link>
        <Link href="/my">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </SC.IconPannels>
    </SC.Footer>
  );
};

export default Footer;
