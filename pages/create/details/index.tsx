import React, {useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import * as SC from "@/components/styled/main_boardwrite_details";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ImageUrlFunction, CreatePostType } from "@/src/redux/Posts/postSlice";
import { useDispatch } from "react-redux";
import {addPost} from "@/src/redux/Posts/postSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";


const Details: React.FC = ()=> {
  const router = useRouter()
  const [post, setPost] = useState<CreatePostType | null>(null);
  const [image, setImage] = useState("이미지");
  const [contents, setContents] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const memberId = 1;
  const postData = useSelector((state: RootState) => state.posts);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  }

  useEffect(() => {
    // inputRef에 input 요소를 할당
    if (inputRef.current) {
      inputRef.current.value = contents;
    }
  }, [contents]);

  const handleCreateBoard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    try {
      // 게시글 데이터 생성
      const createdPost: CreatePostType = {
        memberId: memberId,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bradypus.jpg/450px-Bradypus.jpg",
        contents: contents, // 이 부분을 입력 내용으로 수정해야 함
        likeCount: 0,
        commentsCounts: 0,
        postId: postData.posts.length + 1, // 새로운 글의 ID를 정의
      };
  
      dispatch(addPost(createdPost)); // 리덕스 스토어에 글 추가
      router.push('/main'); // 페이지 이동은 여기서 호출하지 않고 상태 업데이트 후에 이동해야 함
    } catch (error) {
      console.error(error);
    }
  };
  
  const handlePrevClick = () => {
    router.push('/create');
    
  }
 // 임시로 띄운 오른쪽 이미지 미리보기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        if (response.data && response.data.length > 0) {
          setPost(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <SC.Header>
        <SC.Prev onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>새 게시물</SC.H1>
        <SC.Next onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleCreateBoard(event)}>공유하기</SC.Next>
      </SC.Header>
      <SC.Container>
        <SC.MyProfile />
        <SC.TextCont>
          <SC.InputText ref={inputRef} type="text" value={contents} onChange={handleInputChange} placeholder="내용을 입력하세요" />
        </SC.TextCont>
        <SC.PicCon> {post && <Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bradypus.jpg/450px-Bradypus.jpg"} alt="fetched image" width={50} height={50} />}</SC.PicCon>
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
    </>
  );
};

export default Details;
