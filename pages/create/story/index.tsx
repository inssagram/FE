import React , {ButtonHTMLAttributes, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faXmark, faPencil, faFont, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/components/styled/main_boardwirte_story";
import Image from "next/image";
import axios from "axios";
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { storage } from "@/components/firebase/firebase";


const Story: React.FC = () => {
  const token = sessionStorage.getItem('token')
  const BASE_URL = process.env.BASE_URL
  const [previewImage, setPreviewImage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [isTexting, setIsTexting] = useState<boolean>(false)
  const [textValue, setTextValue] = useState<string>("")
  const [textBoxes, setTextBoxes] = useState<string[]>([])
  
  type Position = {
    x: string;
    y: string
  }

  const [position, setPosition] = useState<Position[]>([{x: "50%", y: "20%"}])
  const [isDragging, setIsDragging] = useState<boolean>(false)



  const handlePreviewImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files.length > 0){
        const image = e.target.files[0]
        const storageRef = ref(storage, `files/${image.name}`)
        const uploadTask = uploadBytes(storageRef, image)

        uploadTask.then((snapshot) => {
          e.target.value = "";
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log("File is", downloadURL);
            setPreviewImage(downloadURL)
          })
        })
      }else{
        setPreviewImage((prev) => prev)
      }
  }

  const handleUploadImage = (e:SubmitEvent) => {
    e.preventDefault()
    if(file){
        axios.post(`${BASE_URL}/story/create`,{
          "image": previewImage
        },{
          headers: {
            Authorization: `${token}`
          }
        }).then((res) => console.log(res)).catch((error) => console.log(error))
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
    console.log(e)
     if (isDragging === true) {
    const touch = e.touches[0]
    const offsetX = touch.clientX - parseFloat(position[i].x);
    const offsetY = touch.clientY - parseFloat(position[i].y);

    setPosition((prev) => [
      ...prev.slice(0, i),
      { x: `${parseFloat(position[i].x) + offsetX}px`, y: `${parseFloat(position[i].y) + offsetY}px` },
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
      <SC.body>
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
