import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faXmark, faPencil, faFont, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/components/styled/main_boardwirte_story";
import Image from "next/image";

const Story: React.FC = () => {
  return (
    <>
      <SC.Header>
        <SC.Prev>
          <FontAwesomeIcon icon={faXmark} style={{ color: "white", fontSize: "2rem" }} />
        </SC.Prev>
        <SC.IconPannels>
          <FontAwesomeIcon icon={faDownload} style={{ color: "white", fontSize: "2rem" }} />
          <FontAwesomeIcon icon={faFaceSmile} style={{ color: "white", fontSize: "2rem" }} />
          <FontAwesomeIcon icon={faPencil} style={{ color: "white", fontSize: "2rem" }} />
          <FontAwesomeIcon icon={faFont} style={{ color: "white", fontSize: "2rem" }} />
        </SC.IconPannels>
      </SC.Header>
      <SC.body>
        <Image src="/images/cat.jpg" alt="cute cat" fill />
      </SC.body>
      <SC.Footer>
        <FontAwesomeIcon icon={faPlus} style={{ backgroundColor: "white", color: "gray", fontSize: "2rem", borderRadius: "50%" }} />
        <span style={{ marginLeft: "1rem" }}>스토리에 추가</span>
      </SC.Footer>
    </>
  );
};

export default Story;
