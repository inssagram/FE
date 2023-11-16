import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import * as SC from "@/components/styled/main_boardwrite_details";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ImageUrlFunction, CreatePostType } from "@/src/redux/Posts/postSlice";
import { useDispatch } from "react-redux";
import { addPost } from "@/src/redux/Posts/postSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { v4 as uuidv4} from "uuid"
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from "@/components/firebase/firebase";
import axiosInstance from "@/services/axiosInstance";


const Details: React.FC = () => {
  const router = useRouter();
  const [post, setPost] = useState<CreatePostType | null>(null);
  const [contents, setContents] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const memberId = 1;
  // const postData = useSelector((state: RootState) => state.posts);
  const [previewImage,setPreviewImage] = useState<string>('')
  const [fileData, setFileData] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const user = useSelector((state: any) => state.user)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  interface imageState {
    image: string
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  useEffect(() => {
    // inputRef에 input 요소를 할당
    if (inputRef.current) {
      inputRef.current.value = contents;
    }
  }, [contents]);


  const uploadImageToServer = async (imageBlob: string, contents: string, fileName: string) => {
    const postData = {
      "type": "post",
      "image": [imageBlob],
      "contents": contents,
      "fileName": [fileName]
    }
    try{
      const res = await axiosInstance({
        method: "post",
        url: "/post/create",
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        data: postData,
      });
      return res.data.postId
    }catch(error){
      console.error(error)
    }
  };

  const handleCreateBoard = async () => {
    try {
      if(fileData !== null){
        const uuid = uuidv4()
        const storageRef = ref(storage, `post/${user.member.nickname}/${uuid}`);
        const uploadTask = uploadBytes(storageRef, fileData);
        const blobImage = await uploadTask;
        const downloadURL = await getDownloadURL(blobImage.ref);
        const postId = await uploadImageToServer(downloadURL, contents, uuid)
        router.push(`/my/feeds/${postId}`)
     }
    }catch (error) {
      console.error(error);
    }

  };

  const handleAddFile = () => {
    if(fileRef.current){
      fileRef.current.click();
    }
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null){
      const image = e.target.files[0]
      const imageURL = URL.createObjectURL(image)
      setPreviewImage(imageURL)
      setFileData(image)
    }else{
      setPreviewImage((prev) => prev)
    }
  }

  const handlePrevClick = () => {
    router.push("/");
  };


  

  return (
    <>
      <SC.Header>
        <SC.Prev onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>새 게시물</SC.H1>
        <SC.Next
          onClick={handleCreateBoard}
        >
          공유하기
        </SC.Next>
      </SC.Header>
      <SC.Container>
        <SC.MyProfile />
        <SC.TextCont>
          <SC.InputText
            ref={inputRef}
            type="text"
            value={contents}
            onChange={handleInputChange}
            placeholder="내용을 입력하세요"
          />
          <input
            ref={fileRef}
            type="file"
            onChange={(e) => handleFileChange(e)}
            style={{display: 'none'}}
          />
          {previewImage ? <Image src={previewImage} width={50} height={50} alt={previewImage} />: <FontAwesomeIcon onClick={handleAddFile} icon={faPlusCircle}/>}
        </SC.TextCont>
      </SC.Container>
      <SC.FunctionPannels>
        <SC.Button>
          <SC.Text>위치 추가</SC.Text>
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faChevronRight} />
        </SC.Button>
      </SC.FunctionPannels>
      <SC.FunctionPannels>
        <SC.Button>
          <SC.Text>사람 태그</SC.Text>
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faChevronRight} />
        </SC.Button>
      </SC.FunctionPannels>
      <SC.FunctionPannels>
        <SC.Button>
          <SC.Text>고급 설정</SC.Text>
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faChevronRight} />
        </SC.Button>
      </SC.FunctionPannels>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Details;
