import React , {ButtonHTMLAttributes, useState, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faXmark, faPencil, faFont, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/components/styled/main_boardwrite_story"
import Image from "next/image";
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { storage } from "@/components/firebase/firebase";
import html2canvas from "html2canvas";
import { v4 as uuidv4} from "uuid"
import { useSelector } from "react-redux";
import axiosInstance from "@/services/axiosInstance";
import { handleResizeImage } from "@/components/Post/handleResizeImage";

const Story: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isTexting, setIsTexting] = useState<boolean>(false)
  const [textValue, setTextValue] = useState<string>("")
  const [textBoxes, setTextBoxes] = useState<string[]>([])
  const divRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: any) => state.user)

  type Position = {
    x: string;
    y: string
  }

  const [position, setPosition] = useState<Position[]>([{x: "50%", y: "20%"}])
  const [isDragging, setIsDragging] = useState<boolean>(false)



  const handlePreviewImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files !== null){
        const image = e.target.files[0]
        const imageURL = URL.createObjectURL(image)
        setPreviewImage(imageURL)
      }else{
        setPreviewImage((prev) => prev)
      }
  }

  const uploadImageToServer = async (imageBlob: string, fileName: string) => {
    const postData = {
      "image": imageBlob,
      "fileName": fileName
    }
      await axiosInstance({
        method: "post",
        url: "/story/create",
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        data: postData,
      });
  };


  const handleUploadImage = async (e:SubmitEvent) => {
    e.preventDefault()
    if (!divRef.current) return;
    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b));
      });
      if (blob) {
        const uuid = uuidv4()
        const file = new File([blob], "resize.jpeg", { type: 'image/jpeg' });
        const resizedImage = (await handleResizeImage(file)) as File
        const storageRef = ref(storage, `story/${user.member.nickname}/${uuid}`);
        const uploadTask = uploadBytes(storageRef, resizedImage);
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        await uploadImageToServer(downloadURL, uuid)
    }}catch (error) {
      console.error("ERROR", error);
    }
   }

   const handleStartText = () => {
    setIsTexting(true);
   }


   const handleEndText = () => {
     setTextBoxes((prev) => [...prev, textValue])
     setTextValue("")
     setIsTexting(false);
   }

   const handleTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
   }


   const handleTouchStart = () => {
    setIsDragging(true)
   }


   const handleTouchMove = (e:React.TouchEvent, i: number) => {
     if (isDragging === true) {
    const touch = e.touches[0]
    const offsetX = touch.clientX - parseFloat(position[i].x);
    const offsetY = touch.clientY - parseFloat(position[i].y);

    setPosition((prev) => [
      ...prev.slice(0, i),
      { x: `${parseFloat(position[i].x) + offsetX}px`, y: `${parseFloat(position[i].y) + offsetY}px`},
      ...prev.slice(i + 1),
    ]);
  }
   }


   const handleTouchEnd = () => {
    setIsDragging(false);
   }

   



  return (
    <>
    <form>
      <SC.Header>
        <SC.Prev>
          <FontAwesomeIcon icon={faXmark} style={{ color: "white", fontSize: "2rem"}} />
        </SC.Prev>
        <SC.IconPannels>
          <SC.UploadBox>
              <SC.HiddenInput onChange={(e) => handlePreviewImage(e)}></SC.HiddenInput>
              <FontAwesomeIcon icon={faDownload} style={{ color: "white", fontSize: "2rem"}} />
          </SC.UploadBox>
          <FontAwesomeIcon icon={faFaceSmile} style={{ color: "white", fontSize: "2rem" }} />
          <FontAwesomeIcon icon={faPencil} style={{ color: "white", fontSize: "2rem" }} />
          {isTexting 
          ? <span onClick={handleEndText} style={{ color: "white", fontSize: "2rem" }}>완료</span> 
          : <FontAwesomeIcon 
              onClick={(e) => handleStartText()} 
              icon={faFont} 
              style={{ color: "white", fontSize: "2rem" }}
            />
          }
        </SC.IconPannels>
      </SC.Header>
      <SC.body ref={divRef}>
        <SC.Filter isTexting={isTexting}></SC.Filter>
        {previewImage 
          ? (<Image src={previewImage} alt={previewImage} fill/>) 
          : <SC.Empty></SC.Empty>
        }
        {isTexting ? 
        (<SC.TextArea
          autoFocus={true} 
          isTexting={isTexting}
          onChange={(e) => handleTextChange(e)}>
        </SC.TextArea>) 
        : null}
        {textBoxes.length > 0 
          ? textBoxes.map((_, i) => <SC.TextBox
            key={i}
            style={{top: position[i].y, left: position[i].x}}
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => handleTouchMove(e, i)}
            onTouchEnd={handleTouchEnd}
          >{textBoxes[i]}</SC.TextBox>) 
          : null
        }
      </SC.body>
      <SC.Footer>
        <SC.Button onClick={(e:any) => {
          handleUploadImage(e)
        }}>
          <FontAwesomeIcon icon={faPlus} style={{ backgroundColor: "white", color: "gray", fontSize: "2rem", borderRadius: "50%" }} />
          <span style={{ marginLeft: "1rem" }}>스토리에 추가</span>
        </SC.Button>
      </SC.Footer>
    </form>
    </>
  );
};

export default Story;