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
  const {postId} = router.query;

  useEffect(() => {
    if (postId) {
      // postId를 기반으로 서버에서 해당 게시물 데이터를 가져옴
      axios.put(`http://3.36.239.69:8080/post/update/${postId}`)
        .then(response => {
          setContents(response.data.contents);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [postId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  }

  useEffect(() => {
    // inputRef에 input 요소를 할당
    if (inputRef.current) {
      inputRef.current.value = contents;
    }
  }, [contents]);

  const handleUpdatePost = async () => {
    try {
      // 수정된 게시물 내용을 서버에 업데이트
      await axios.put(`http://3.36.239.69:8080/post/update/${postId}`, {
        contents: contents,
        location: '새로운 위치 정보', // 필요한 경우 다른 필드도 업데이트 가능
      });

      // 수정이 완료되면 메인 페이지로 이동
      router.push('/main');
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
        <SC.Next onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleUpdatePost()}>수정하기</SC.Next>
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
