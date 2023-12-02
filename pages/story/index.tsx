import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/story";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import axiosInstance from "@/services/axiosInstance";



const Story: React.FC = () => {
  const router = useRouter()
  const [currentRotation, setCurrentRotation] = useState(0);
  const [data, setData] = useState<dataItem[]>([])
  const [contentsIndex, setContentsIndex] = useState(0)
  const [imagesIndexArr, setImagesIndexArr] = useState<number[]>([]);
  const [flag, toggleFlag] = useState(false);
  const [availableIndex, setAvailableIndex] = useState<number[]>([]);
  const [onFilter, setOnFilter] = useState(false)
  const [animationStopped, setAnimationStopped] = useState(false)
  

  interface dataItem{
    image: string[],
    memberId: number,
    memberNickname: string,
    memberProfile: string,
    passedTime: string
    storyId: number,
  }

  interface cubesItem{
    index: number
  }

  const handleFlip = (e: any, i: number) => {
    const totalWidth = e.target.width;
    const clickPosition = e.clientX;
    const imagesLength = data[contentsIndex].image.length
    if (clickPosition < totalWidth / 2) {
      if(imagesIndexArr[i] === 0 && contentsIndex > 0){
        setCurrentRotation(currentRotation + 90);
        setContentsIndex((prev) => prev - 1)
      }else if(imagesIndexArr[i] === 0 && contentsIndex === 0){
        return
      }else{
        setImagesIndexArr(prevState => {
          const newImagesIndexArr = [...prevState];
          newImagesIndexArr[i] -= 1;
          return newImagesIndexArr;
        });
      }
    } else if (clickPosition > totalWidth / 2) {
      if(imagesIndexArr[i] === imagesLength - 1  && contentsIndex === data.length - 1){
        router.push('/')
      }else if(imagesIndexArr[i] === imagesLength - 1){
        setCurrentRotation(currentRotation - 90);
        setContentsIndex((prev) => prev + 1)
      }else{
        setImagesIndexArr(prevState => {
          const newImagesIndexArr = [...prevState];
          newImagesIndexArr[i] += 1;
          return newImagesIndexArr;
        });
      }
    }
  };

  // useEffect(() => {
  //   getStorydata()
  //   .then((res) => {
  //     setData(res.data)
  //     console.log(res)
  //   })
  //   .catch((error) => console.error(error))
  // },[])

  useEffect(() => {
    setImagesIndexArr(Array(data.length).fill(0))
  },[data])
  
  useEffect(() => {
    setAvailableIndex([contentsIndex - 1, contentsIndex, contentsIndex + 1])
  },[contentsIndex])


  const flagHandler = () => {
    toggleFlag(true)
  }

  
  useEffect(() => {
    if(flag && data.length !== 0){
      const imagesLength = data[contentsIndex].image.length
      if(imagesIndexArr[contentsIndex] === imagesLength - 1  && contentsIndex === data.length - 1){
        router.push('/')
      }else if(imagesIndexArr[contentsIndex] === imagesLength - 1){
        setCurrentRotation(currentRotation - 90);
        setContentsIndex((prev) => prev + 1)
      }else{
        setImagesIndexArr(prevState => {
          const newImagesIndexArr = [...prevState];
          newImagesIndexArr[contentsIndex] += 1;
          return newImagesIndexArr;
        });
      }
      toggleFlag(false)
    }
  }, [flag,imagesIndexArr]);


  const handleSendDM = () => {
  }
 

  const Cube: React.FC<cubesItem> = ({ index }) => (
      <SC.Article 
        style={{ transform: `rotateY(${index * 90}deg) translateZ(calc(100vw / 2))`, display: availableIndex.includes(index) ? "block" : "none"}} 
      >
          <SC.ProgressBars>
            {data.map((_, i) => {
                return(
                    <SC.Bar key={i}>
                      <SC.BarCover key={i} 
                      isComplete={imagesIndexArr[index] > i} 
                      isAnimating={imagesIndexArr[index] === i}
                      onAnimationEnd={flagHandler}
                      animationStopped={animationStopped}
                      ></SC.BarCover>
                    </SC.Bar>
                  )
              }
            )}
          </SC.ProgressBars>
          <SC.Head>
            <SC.Profile>
              <Image
                src={data[index].memberProfile}
                alt={data[index].memberNickname}
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.ID>{data[index].memberNickname}</SC.ID>
              <SC.PostedTime>6시간</SC.PostedTime>
            </SC.Profile>
            <SC.More>
              <FontAwesomeIcon icon={faEllipsis} fontSize={"25px"} />
            </SC.More>
          </SC.Head>
          <SC.Contents style={{ position: "relative" }}>
            <Image
              src={data[index].image[imagesIndexArr[index]]}
              alt="개"
              fill={true}
            />
          </SC.Contents>
          <SC.Comment onFilter={onFilter}>
          <SC.TextBox onClick={() => {
            setOnFilter(true)
            setAnimationStopped(true)
          }}>메시지를 입력하세요</SC.TextBox>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.Comment>
          <SC.DMfilter onClick={() => {
            setOnFilter(false)
            setAnimationStopped(false)
          }}
          onFilter={onFilter}>
            <SC.TextArea 
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  setOnFilter(false)
                  setAnimationStopped(false)
                }
              }}
            ></SC.TextArea>
          </SC.DMfilter>
        </SC.Article>
  )
  



  
  if(data.length !== 0){
  return (
    <>
      <SC.Container onClick={(e) => handleFlip(e,contentsIndex)} style={{ transform: `rotateY(${currentRotation}deg)`, transition: "transform 0.5s ease-in-out" }}>
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
