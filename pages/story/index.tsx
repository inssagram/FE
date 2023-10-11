import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/styled/story";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Story: React.FC = () => {
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleFlip = (e: any) => {
    const totalWidth = e.target.width;
    const clickPosition = e.clientX;
    if (clickPosition < totalWidth / 2) {
      setCurrentRotation(currentRotation + 90);
    } else if (clickPosition > totalWidth / 2) {
      setCurrentRotation(currentRotation - 90);
    }
  };

  return (
    <>
      <SC.Container onClick={handleFlip} style={{ transform: `rotateY(${currentRotation}deg)`, transition: "transform 0.5s ease-in-out" }}>
        <SC.Article className="cube1">
          <SC.ProgressBars>
            <SC.Bar></SC.Bar>
          </SC.ProgressBars>
          <SC.Head>
            <SC.Profile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg/220px-Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.ID>정호다</SC.ID>
              <SC.PostedTime>6시간</SC.PostedTime>
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} fontSize={"25px"} />
            </SC.More>
          </SC.Head>
          <SC.Contents style={{ position: "relative" }}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg/220px-Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg"
              alt="개"
              layout="fill"
              objectFit="cover" // 이미지를 꽉 채우도록 설정
            />
          </SC.Contents>
          <SC.Comment>
            <SC.TextArea placeholder="메시지를 입력하세요"></SC.TextArea>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.Comment>
        </SC.Article>
        <SC.Article className="cube2">
          <SC.ProgressBars>
            <SC.Bar></SC.Bar>
          </SC.ProgressBars>
          <SC.Head>
            <SC.Profile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.ID>정호다</SC.ID>
              <SC.PostedTime>6시간</SC.PostedTime>
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} fontSize={"25px"} />
            </SC.More>
          </SC.Head>
          <SC.Contents style={{ position: "relative" }}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
              alt="개"
              layout="fill"
              objectFit="cover" // 이미지를 꽉 채우도록 설정
            />
          </SC.Contents>
          <SC.Comment>
            <SC.TextArea placeholder="메시지를 입력하세요"></SC.TextArea>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.Comment>
        </SC.Article>
        <SC.Article className="cube3">
          <SC.ProgressBars>
            <SC.Bar></SC.Bar>
          </SC.ProgressBars>
          <SC.Head>
            <SC.Profile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/New_born_pups.JPG/220px-New_born_pups.JPG"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.ID>정호다</SC.ID>
              <SC.PostedTime>6시간</SC.PostedTime>
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} fontSize={"25px"} />
            </SC.More>
          </SC.Head>
          <SC.Contents style={{ position: "relative" }}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/New_born_pups.JPG/220px-New_born_pups.JPG"
              alt="개"
              layout="fill"
              objectFit="cover" // 이미지를 꽉 채우도록 설정
            />
          </SC.Contents>
          <SC.Comment>
            <SC.TextArea placeholder="메시지를 입력하세요"></SC.TextArea>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.Comment>
        </SC.Article>
        <SC.Article className="cube4">
          <SC.ProgressBars>
            <SC.Bar></SC.Bar>
          </SC.ProgressBars>
          <SC.Head>
            <SC.Profile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pupplies_loving.jpg/220px-Pupplies_loving.jpg"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.ID>정호다</SC.ID>
              <SC.PostedTime>6시간</SC.PostedTime>
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} fontSize={"25px"} />
            </SC.More>
          </SC.Head>
          <SC.Contents style={{ position: "relative" }}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pupplies_loving.jpg/220px-Pupplies_loving.jpg"
              alt="개"
              layout="fill"
              objectFit="cover" // 이미지를 꽉 채우도록 설정
            />
          </SC.Contents>
          <SC.Comment>
            <SC.TextArea placeholder="메시지를 입력하세요"></SC.TextArea>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.Comment>
        </SC.Article>
      </SC.Container>
    </>
  );
};

export default Story;
