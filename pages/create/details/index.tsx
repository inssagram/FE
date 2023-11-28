import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as SC from "@/components/styled/create_details";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faImages,
  faPlus,
  faPlusCircle,
  faX,
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { storage } from "@/components/firebase/firebase";
import { handleResizeImage } from "./handleResizeImage";
import axiosInstance from "@/services/axiosInstance";

const Details: React.FC = () => {
  const [contents, setContents] = useState("");
  const [previewImage,setPreviewImage] = useState<string[]>([])
  const [fileData, setFileData] = useState<File | null>(null)
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const user = useSelector((state: any) => state.user)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isModal, setIsModal] = useState(false)
  const [isImagesModal, setIsImagesModal] = useState<boolean>(false)
  const [slideProps, setSlideProps] = useState<number>(0)

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const uploadImageToServer = async (
    imageBlob: string,
    contents: string,
    fileName: string
  ) => {
    const postData = {
      type: "post",
      image: [imageBlob],
      contents: contents,
      fileName: [fileName],
    };

    try {
      const res = await axiosInstance({
        method: "post",
        url: "/post/create",
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        data: postData,
      });

      return res.data.postId;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateBoard = async () => {
    try {
      if (fileData !== null) {
        const uuid = uuidv4();
        const resizedImage = (await handleResizeImage(fileData)) as File;
        const storageRef = ref(storage, `post/${user.member.nickname}/${uuid}`);
        const uploadTask = uploadBytes(storageRef, resizedImage);
        const blobImage = await uploadTask;
        const downloadURL = await getDownloadURL(blobImage.ref);
        const postId = await uploadImageToServer(downloadURL, contents, uuid);
        router.push(`/post/${postId}`);
      }
    } catch (error) {
      ``;
      console.error(error);
    }
  };

  const handleAddFile = () => {
    if(previewImage.length > 4){
      alert("사진은 최대 5장 업로드 할 수 있습니다.")
      return
    }
    if(fileRef.current){
      fileRef.current.click();
    }
  };

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null && e.target.files !== undefined){
      const image = e.target.files[0]
      const supportedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!supportedFormats.includes(image.type)) {
        alert(
          "지원되지 않는 이미지 형식입니다. JPEG, PNG 또는 WEBP 형식의 이미지를 업로드해주세요."
        );
        return;
      }
      const imageURL = URL.createObjectURL(image)
      setPreviewImage([...previewImage, imageURL])
      setFileData(image)
    }else{
      setPreviewImage((prev) => prev)
    }
  };

  const handlePrevClick = () => {
    router.push("/main");
  };

  const handleModal = () => {
    setIsModal(!isModal)
  }

  const handleImagesModal = () => {
    setIsImagesModal(!isImagesModal)
  }

  const handleDeleteImage = (index: number) => {
    setPreviewImage((prev) => prev.filter((_, i) => i !== index))
    setSlideProps((prev) => prev > 0 ? prev - 1 : prev)
  }



  const handleSlideProps = (direction: string) => {
    if(direction === "right" && slideProps <= previewImage.length){
      setSlideProps((prev) => prev + 1)
      return
    }
    if(direction === "left" && slideProps !== 0){
      setSlideProps((prev) => prev - 1)
      return
    }
  }

  const handleDragStart = (e:React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  }

  const handleDragOver = (e:React.DragEvent) => {
    e.preventDefault()
  }


  const handleDrop = (e: React.DragEvent, index: number) => {
    const dragIndex = Number(e.dataTransfer.getData('text/plain'));
    const hoverIndex = index;
    const newImages = [...previewImage];
    const dragImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, dragImage);
    setPreviewImage(newImages);
  };

  return (
    <>
      <SC.Header>
        <SC.Prev onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>새 게시물</SC.H1>
        <SC.Next onClick={handleCreateBoard}>공유하기</SC.Next>
      </SC.Header>
      <SC.Container>
        <SC.TextCont>
          <SC.MyProfile></SC.MyProfile>
          <SC.Textarea
            placeholder="내용을 입력해주세요"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleTextareaChange(e)
            }
          />
          <input
            ref={fileRef}
            type="file"
            onChange={(e) => handleFileChange(e)}
            style={{ display: "none" }}
          />
          {previewImage.length > 0 ? <Image src={previewImage[0]} width={50} height={50} alt={previewImage[0]} />: <FontAwesomeIcon onClick={handleAddFile} icon={faPlusCircle} style={{marginBottom: "10px"}}/>}
        </SC.TextCont>
      </SC.Container>
      <SC.FunctionPannels onClick={handleModal}>
        <SC.Button>
          <SC.Text>사진 추가</SC.Text>
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
      {isModal 
      ? (<SC.ModalFilter onClick={handleModal}>
        <SC.Modal onClick={(e) => e.stopPropagation()}>
          <SC.ModalHead>
            <FontAwesomeIcon icon={faX} onClick={handleModal}/>
            <SC.ModalTitle>사진 추가</SC.ModalTitle>
            <SC.ModalPost>게시하기</SC.ModalPost>
          </SC.ModalHead>
          <SC.ModalBody>
            {previewImage.length > 0 ? <Image src={previewImage[slideProps]} fill={true} alt={previewImage[slideProps]} style={{ borderRadius: "0 0 20px 20px"}}></Image> : <span>사진을 추가해 주세요</span> }
            <SC.EditButton onClick={handleImagesModal} isimagesmodal={isImagesModal}>
              <FontAwesomeIcon icon={faImages}/>
            </SC.EditButton>
            {isImagesModal ?
            <SC.ImagesModal>
              <SC.Slide>
                <SC.ImagesList slideProps={slideProps}>
                { previewImage.length > 0 ?
                  previewImage.map((v, i) => (
                    <SC.ImageBox key={i}
                      onDragStart={(e:React.DragEvent) => handleDragStart(e, i)}
                      onDragOver={(e:React.DragEvent) =>handleDragOver(e)}
                      onDrop={(e:React.DragEvent) => handleDrop(e, i)}
                      >
                      <SC.DeleteButton key={i} onClick={() => handleDeleteImage(i)}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                      </SC.DeleteButton>
                      <Image src={v} alt={v} fill={true} style={{borderRadius: "20px"}}></Image>
                    </SC.ImageBox>
                  ))
                  : null
                }
                </SC.ImagesList>
                  {slideProps > 0 ? (
                    <SC.LeftButton onClick={() => handleSlideProps("left")}>
                      <FontAwesomeIcon icon={faCircleChevronLeft}/>
                    </SC.LeftButton>)
                    : null}
                  {previewImage.length > 1 && slideProps < previewImage.length - 1 ? (
                    <SC.RightButton onClick={() => handleSlideProps("right")}>
                      <FontAwesomeIcon icon={faCircleChevronRight}/>
                    </SC.RightButton>)
                    : null 
                  }
              </SC.Slide>
              <SC.AddButton onClick={handleAddFile} >
                <FontAwesomeIcon icon={faPlus}/>
              </SC.AddButton>
            </SC.ImagesModal>
            : null
            }
          </SC.ModalBody>
        </SC.Modal>
      </SC.ModalFilter>)
      : null  
      }
    </>
  );
};

export default Details;
