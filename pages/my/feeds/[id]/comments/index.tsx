import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/my_feeds_comments";
import Image from "next/image";
import { faHeart, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { deleteComment } from "@/src/redux/Posts/commentSlice";
import useLongPress from "./useLongPress";
import getCommentAxios from "@/services/postInfo/getComment";
import Modal from "./modal";
import axios from "axios";

interface CommentType {
  id: number;
  userId: string;
  content: string;
  profile:string;
}

interface PostData {
  postId: number;
  memberId: number;
  nickname: string;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

const Comments: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const dispatch = useDispatch();
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [post, setPost] = useState<PostData | null>(null);
  const [commentAll, setCommentAll] = useState([]);
  console.log(commentAll);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://3.36.239.69:8080/post/search-detail/${id}`)
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.error("게시물 데이터를 불러오는 중 오류 발생:", error);
        });
    }
  }, [id]);



  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      console.warn("빈 댓글은 제출할 수 없습니다.");
    } else {
      const postId = post?.postId;
      const token = sessionStorage.getItem("token");
  
      if (!postId || !token) {
        console.error("게시물 ID 또는 토큰이 유효하지 않습니다.");
        return;
      }
  
      // 쿼리 매개변수를 객체로 전달
      const queryParams = {
        params: {
          "post-id": postId,
        },
      };
  
      axios
        .post(
          `http://3.36.239.69:8080/comment/create`,
          {
            contents: comment.trim(),
          },
          {
            headers: {
              Authorization: `${token}`,
            },
            // 객체 형태의 쿼리 매개변수 전달
            ...queryParams,
          }
        )
        .then((response) => {
          console.log("댓글이 성공적으로 제출되었습니다:", response.data);
          setComment("");
        })
        .catch((error) => {
          console.error("댓글 제출 중 오류 발생:", error);
        });
    }
  };

  const fetchCommentData = async (postId: number) => {
    try {
      const response = await getCommentAxios(postId);
      setCommentAll(response.data);
    } catch(error) {
      console.error("error fetching comments", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCommentData(id);
    }

  }, [id]);

  const handleCommentLongPress = useLongPress(() => {
    setModalOpen(true);
  }, 1000);

  const handleCommentClick = (commentId: number) => {
    setSelectedCommentId(commentId);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (comment.trim() !== "") {
        handleCommentSubmit();
      } else {
        console.warn("Cannot submit an empty comment.");
      }
      event.preventDefault();
    }
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId) {
      dispatch(deleteComment(selectedCommentId));
    }
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  const handlePrev = () => {
    if (id) {
      router.push(`/my/feeds/${id}`);
    }
  };

  return (
    
    <SC.Container>
      <SC.Header>
        <SC.Prev onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>댓글</SC.H1>
      </SC.Header>

      <SC.Head>
        <SC.Profile>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
            alt="개"
            width={40}
            height={40}
            style={{ borderRadius: "100%" }}
          />
         {post && (
      <>
      <SC.ID>{post.nickname}</SC.ID>
        <SC.Content>{post.contents}</SC.Content>
      </>
    )}
        </SC.Profile>
        <SC.ContentsDate>16주</SC.ContentsDate>
      </SC.Head>
      <SC.Details>
        <SC.CommentCont>
        {commentAll.map((comment: CommentType) => (
        <SC.UserCont key={comment.id} onMouseDown={handleCommentLongPress.onMouseDown} onClick={() => handleCommentClick(comment.id)} >
          <SC.UserProfile>
            <Image
              src={comment.profile}
              alt="프로필 이미지"
              width={40}
              height={40}
              style={{ borderRadius: "100%" }}
            />
            <SC.UserId>{comment.userId}</SC.UserId>
            <SC.CommentsDate>8주 전</SC.CommentsDate>
          </SC.UserProfile>
          <SC.UserComment>
            {comment.content}
            <FontAwesomeIcon icon={faHeart} fontSize={"20px"} />
          </SC.UserComment>
          <SC.WriteReply>답글 달기</SC.WriteReply>
        </SC.UserCont>
      ))}
          <SC.UserCont>
            <SC.UserProfile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.UserId>Ahnjanhee</SC.UserId>
              <SC.CommentsDate>12주</SC.CommentsDate>
            </SC.UserProfile>
            <SC.UserComment>이 분 지금 뭐함?</SC.UserComment>
            <SC.WriteReply>답글 달기</SC.WriteReply>
          </SC.UserCont>
          <SC.AllComment>답글 4개 모두 보기</SC.AllComment>
        </SC.CommentCont>
         {/* 모달 */}
      {isModalOpen && selectedCommentId !== null && (
        <Modal onDelete={handleDeleteComment} onCancel={handleCancelDelete} /> // 모달 컴포넌트를 렌더링하고 삭제 및 취소 버튼의 이벤트 핸들러 전달
      )}
      </SC.Details>
      <SC.CommentsContainer>
        <SC.UserProfile>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
            alt="개"
            width={40}
            height={40}
            style={{ borderRadius: "100%" }}
          />
        </SC.UserProfile>
        <SC.CommentsForm>
        <SC.CommentsInput value={comment} onKeyDown={handleKeyDown} onChange={handleCommentChange} placeholder="댓글 달기..." />

          <SC.SmileIcon>
            <FontAwesomeIcon icon={faFaceSmile} fontSize={"2rem"} />
          </SC.SmileIcon>
        </SC.CommentsForm>
      </SC.CommentsContainer>

      <Footer />
    </SC.Container>
  );
};

export default Comments;
