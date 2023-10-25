import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/story";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Story: React.FC = () => {
  const router = useRouter()
  const [currentRotation, setCurrentRotation] = useState(0);
  const [data, setData] = useState<dataItem[]>([])
  const [contentsIndex, setContentsIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [flag, toggleFlag] = useState(false);
  const [availableIndex, setAvailableIndex] = useState<number[]>([]);



  interface dataItem{
    id: number,
    image: string[],
    userId: string,
    userProfile: string,
    postedTime: string
  }

  interface cubesItem{
    index: number
  }

  const Cube: React.FC<cubesItem> = ({ index }) => (
    <SC.Article 
      style={{ transform: `rotateY(${index * 90}deg) translateZ(calc(100vw / 2))`, zIndex: availableIndex.includes(index) ? 10 : 0}} 
    >
          <SC.ProgressBars>
            {data[index].image.map((_, i) => {
                return(
                    <SC.Bar key={i}>
                      <SC.BarCover key={i} 
                      isComplete={imageIndex > i} 
                      isAnimating={imageIndex === i}
                      onAnimationEnd={flagHandler}
                      ></SC.BarCover>
                    </SC.Bar>
                  )
              }
            )}
          </SC.ProgressBars>
          <SC.Head>
            <SC.Profile>
              <Image
                src={data[index].userProfile}
                alt={data[index].userId}
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.ID>{data[index].userId}</SC.ID>
              <SC.PostedTime>6시간</SC.PostedTime>
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} fontSize={"25px"} />
            </SC.More>
          </SC.Head>
          <SC.Contents style={{ position: "relative" }}>
            <Image
              src={data[index].image[imageIndex]}
              alt="개"
              fill={true}
            />
          </SC.Contents>
          <SC.Comment>
            <SC.TextArea placeholder="메시지를 입력하세요" onClick={(e) => e.stopPropagation()}></SC.TextArea>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.Comment>
        </SC.Article>
  )
  



  const handleFlip = (e: any) => {
    const totalWidth = e.target.width;
    const clickPosition = e.clientX;
    const imagesLength = data[contentsIndex].image.length
    if (clickPosition < totalWidth / 2) {
      if(imageIndex === 0 && contentsIndex > 0){
        setCurrentRotation(currentRotation + 90);
        setContentsIndex((prev) => prev - 1)
        setImageIndex(0)
      }else if(imageIndex === 0 && contentsIndex === 0){
        return
      }else{
        setImageIndex((prev) => prev - 1)
      }
    } else if (clickPosition > totalWidth / 2) {
      if(imageIndex === imagesLength - 1  && contentsIndex === data.length - 1){
        router.push('/')
      }else if(imageIndex === imagesLength - 1){
        setCurrentRotation(currentRotation - 90);
        setContentsIndex((prev) => prev + 1)
        setImageIndex(0)
      }else{
        setImageIndex((prev) => prev + 1)
      }
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/storypage')
    .then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  useEffect(() => {
    setAvailableIndex([contentsIndex - 1, contentsIndex, contentsIndex + 1])
  },[contentsIndex])


  const flagHandler = () => {
    toggleFlag(true)
  }

  
  useEffect(() => {
    if(flag && data.length !== 0){
      const imagesLength = data[contentsIndex].image.length
      console.log(imagesLength)
      if(imageIndex === imagesLength - 1  && contentsIndex === data.length - 1){
        router.push('/')
      }else if(imageIndex === imagesLength - 1){
        setCurrentRotation(currentRotation - 90);
        setContentsIndex((prev) => prev + 1)
        setImageIndex(0)
      }else{
        setImageIndex((prev) => prev + 1)
      }
      toggleFlag(false)
    }
  }, [flag]);


 
  if(data.length !== 0){
  return (
    <>
      <SC.Container onClick={handleFlip} style={{ transform: `rotateY(${currentRotation}deg)`, transition: "transform 0.5s ease-in-out" }}>
        {data.map((cube, index) => (
          <Cube key={index} index={index} {...cube}/>
        ))}
      </SC.Container>
    </>
  )
  }
  ;
};

export default Story;
