import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteComment } from "@/src/redux/Posts/commentSlice";
import Modal from "./modal";
import useLongPress from "./useLongPress";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import { CommentItem } from "@/components/atoms/Item";
import Footer from "@/components/Footer";
import postLikeCommentAxios from "@/services/postInfo/postLikeComment";
import getCommentAllAxios from "@/services/postInfo/getCommentAll";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";
import deleteCommentAxios from "@/services/postInfo/deleteComment";

interface PostItemData {
  commentsCounts: number;
  contents: string;
  createdAt: number;
  hashTags: string;
  image: string;
  likeCount: number;
  memberId: number;
  nickname: string;
  postId: number;
  taggedMemberId: string;
}

interface CommentItemData {
  commentId: number;
  postId: number;
  memberId: number;
  nickname: string;
  content: string;
  likeCount: number;
  replyFlag: boolean;
  createdAt: number;
  mentionList: string[];
  image: string;
}

const Comments: React.FC = () => {
  // const comments = useSelector((state: RootState) => state.comments.comments);
  const [post, setPost] = useState<PostItemData | null>(null);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentAll, setCommentAll] = useState<CommentItemData[]>([]);
  const [isLikeComment, setIsLikeComment] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const pageTitle = "댓글";

  // 게시글 상세 조회
  const fetchPostDetailData = async (postId: number) => {
    try {
      const res = await getPostDetailAxios(postId);
      setPost(res.data);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
  };

  // 게시글 모든 댓글 조회
  const fetchCommentAllData = async (postId: number) => {
    try {
      const res = await getCommentAllAxios(postId);
      setCommentAll(res.data);
    } catch (err) {
      handleError(err, "error fetching comments");
    }
  };

  // 댓글 좋아요
  const handleLikeCommentClick = (commentId: number) => {
    postLikeCommentAxios(commentId)
      .then((res) => {
        console.log("게시물 좋아요가 서버에 성공적으로 전송되었습니다.", res);
        setIsLikeComment(true);
      })
      .catch((err) => {
        handleError(err, "error fetching comments like:");
      });
  };

  const postId = Number(id);

  useEffect(() => {
    if (!isNaN(postId)) {
      fetchPostDetailData(postId);
      fetchCommentAllData(postId);
    }
  }, [postId]);

  // 댓글 작성
  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      console.warn("빈 댓글은 제출할 수 없습니다.");
    } else {
      const token = sessionStorage.getItem("token");
      if (!id || !token) {
        console.error("postId or token is not available");
        return;
      }
      axios
        .post(
          `http://3.36.239.69:8080/comment/create`,
          {
            contents: comment.trim(),
            postId: id,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          console.log("댓글이 성공적으로 제출되었습니다:", response.data);

          const newComment = response.data;
          setCommentAll([...commentAll, newComment]);
          setComment("");
        })
        .catch((error) => {
          handleError("댓글 제출 중 오류 발생:", error);
        });
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
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

  // 모달 열기
  const handleShowModal = (comment: any) => {
    setCommentId(comment.commentId);
    setIsEditModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  // 댓글 삭제
  const handleCommentDelete = () => {
    handleDeleteComment(commentId);
  };

  // 댓글 삭제 요청
  const handleDeleteComment = (id: number) => {
    deleteCommentAxios(id)
      .then((response) => {
        console.log("delete success:", response);
        const updatedComments = commentAll.filter(
          (comment) => comment.commentId !== id
        );
        setCommentAll(updatedComments);
      })
      .catch((err) => {
        handleError(err, "error delete");
      });
    setIsEditModalOpen(false);
  };

  return (
    <Container>
      <PageHeader title={pageTitle} />
      <CommentsContainer>
        <UserProfile>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
            alt="개"
            width={40}
            height={40}
            style={{ borderRadius: "100%" }}
          />
        </UserProfile>
        <CommentsForm>
          <CommentsInput
            value={comment}
            onKeyDown={handleKeyDown}
            onChange={handleCommentChange}
            placeholder="댓글 달기..."
          />

          <SmileIcon>
            <FontAwesomeIcon icon={faFaceSmile} fontSize={"2rem"} />
          </SmileIcon>
        </CommentsForm>
      </CommentsContainer>
      {post && <CommentItem post={post} isReply={false} />}
      {commentAll ? (
        commentAll.map((comment, index) => (
          <div key={index} onClick={() => handleShowModal(comment)}>
            <CommentItem
              post={post}
              comment={comment}
              isLikeComment={isLikeComment}
              handleLikeCommentClick={handleLikeCommentClick}
              isReply={true}
            />
          </div>
        ))
      ) : (
        <Empty>제일 먼저 댓글을 달아보세요 :0</Empty>
      )}
      {isEditModalOpen && (
        <Modal onDelete={handleCommentDelete} onCancel={handleCloseModal} />
      )}
      <Footer />
    </Container>
  );
};

export default Comments;

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  color: black;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const CommentsContainer = styled.div`
  width: 100%;
  height: 8vh;
  border-top: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const CommentsForm = styled.form`
  width: 100%;
  position: relative;
  padding-left: 1rem;
`;

const CommentsInput = styled.input`
  width: 95%;
  height: 4vh;
  border-radius: 10px;
  padding-left: 0.5rem;
`;

const SmileIcon = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
`;

const Empty = styled.span`
  padding: 12px;
  color: #22222;
`;
