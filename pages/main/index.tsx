import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/main";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Main: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<dataItem[]>([])
  const [isAnimating, setIsAnimating] = useState(Array(SC.Stories.length).fill(false));
  const [pointerBlock, setPointerBlock] = useState<boolean>(false)

  const spinnerHandler = (index: number) => {
    const newIsAnimating = [...isAnimating];
    newIsAnimating[index] = true;
    setIsAnimating(newIsAnimating);
    setPointerBlock(true);
    setTimeout(() => router.push("/story"), 2000);
  };



  interface dataItem {
    id: number,
    image: string,
    userId: string
  }

  const getData = () => {
    axios.get('http://localhost:5000/story')
    .then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
  },[])

 

  return (
    <Layout>
      <SC.Container>
        <SC.Stories>
          {data.map((item, index) => (
            <SC.Story key={index}>
              <SC.ImageTag 
                onClick={() => spinnerHandler(index)}
                src={`${item.image}`}
                alt="개" 
                width={40}
                height={40}
                style={{
                  borderColor: isAnimating[index] ? 'white' : 'red',
                  pointerEvents: pointerBlock ? 'none' : 'auto'
                }}
              />
              {isAnimating[index] &&
                <SC.ImageICN>
                  <SC.ImageCUT>
                    <SC.ImageDonut></SC.ImageDonut>
                  </SC.ImageCUT>
                </SC.ImageICN>
              }
              <SC.StoryID>{item.userId}</SC.StoryID>
            </SC.Story>
          ))}
        </SC.Stories>
        
        <SC.Article>
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
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} />
            </SC.More>
          </SC.Head>
          <SC.Contents>
            <SC.ImageContent>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                alt="개"
                fill={true}
              />
            </SC.ImageContent>
          </SC.Contents>
          <SC.Details>
            <SC.Buttons>
              <SC.LeftIcons>
                <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
                <FontAwesomeIcon icon={faComment} fontSize={"25px"} />
                <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
              </SC.LeftIcons>
              <SC.RightIcon>
                <FontAwesomeIcon icon={faBookmark} fontSize={"25px"} />
              </SC.RightIcon>
            </SC.Buttons>
            <SC.Likes>learnupkr님 외 1690명이 좋아합니다</SC.Likes>
            <SC.Paragraph>kkang.stylist 이번주 목요일21일 19시 kkst에서 니트가 최초공개됩니다👏... 더 보기</SC.Paragraph>
            <SC.AllComment>댓글 556개 모두 보기</SC.AllComment>
            <SC.Comment>댓글 달기...</SC.Comment>
          </SC.Details>
        </SC.Article>
        
      </SC.Container>
    </Layout>
  );
};

export default Main;
