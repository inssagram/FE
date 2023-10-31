import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/main";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/Layout";
import { useState, useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import Modal from "./modal";
import { PostType, editPost, deletePost } from "@/src/redux/Posts/postSlice";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<dataItem[]>([])
  const [isAnimating, setIsAnimating] = useState(Array(SC.Stories.length).fill(false));
  const [pointerBlock, setPointerBlock] = useState<boolean>(false)
  const postData = useSelector((state: RootState) => state.posts);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null); // 선택된 아이템의 ID를 저장하는 상태
  const dispatch = useDispatch();

  console.log(postData)

  const handleOptionClick = (postId:number) => {
    setSelectedPostId(postId);
    setModalOpen(true);
  }

  const handleDeletePost = () => {
  if (selectedPostId !== null) {
    dispatch(deletePost(selectedPostId)); // 선택된 postId를 dispatch합니다.
  }
  setModalOpen(false);
  };

  const handleEditPost = (postId: number, updatedPostData: PostType) => {
    const action = editPost(updatedPostData); // editPost 액션을 dispatch하고 해당 액션을 변수에 저장
    dispatch(action); // dispatch로 저장된 액션을 전송

    router.push('/create/details/[id]');
  };


  const handleCancelDelete = () => {
    // 모달 닫기 로직 구현
    setModalOpen(false);
  };

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
        
        {/* 이미지 공유하기 후 나타나는 게시물 리스트 */}
            {postData.posts.map((item,index) => (
             <SC.Article key={index}> 
              <SC.Head>
              <SC.Profile>
                <Image
                  src={item.image}
                  alt="개"
                  width={40}
                  height={40}
                  style={{ borderRadius: "100%" }}
                />
                <SC.ID>정호다</SC.ID>
              </SC.Profile>
              <SC.More onClick={() => handleOptionClick(item.postId)}>
                <FontAwesomeIcon icon={faEllipsis} />
              </SC.More>
            </SC.Head>
            {isModalOpen && selectedPostId !== null && (
        <Modal onEdit={handleEditPost} onDelete={handleDeletePost} onCancel={handleCancelDelete} />
      )}
            <SC.Contents>
              <SC.ImageContent>
                <Image
                  src={item.image}
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
              <SC.Paragraph>{item.contents}</SC.Paragraph>
              <SC.AllComment>댓글 556개 모두 보기</SC.AllComment>
              <SC.Comment>댓글 달기...</SC.Comment>
            </SC.Details>
            </SC.Article>
            ))}
              
      </SC.Container>
    </Layout>
  );
};

export default Main;
