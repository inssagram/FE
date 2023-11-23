import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CommentDeleteModal } from "@/components/atoms/Modal";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import { CommentItem } from "@/components/atoms/Item";
import Footer from "@/components/Footer";
import postLikeCommentAxios from "@/services/postInfo/postLikeComment";
import getCommentAllAxios from "@/services/postInfo/getCommentAll";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";
import deleteCommentAxios from "@/services/postInfo/deleteComment";
import { PostDetailData, CommentItemData } from "@/types/PostTypes";

const Comments: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [post, setPost] = useState<PostDetailData | null>(null);
  const [comment, setComment] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const [commentAll, setCommentAll] = useState<CommentItemData[]>([]);
  const [commentLikes, setCommentLikes] = useState<boolean[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (commentAll.length > 0) {
      setCommentLikes(Array(commentAll.length).fill(false));
    }
  }, [commentAll]);

  // 댓글 좋아요
  const handleLikeCommentClick = (commentId: number) => {
    postLikeCommentAxios(commentId)
      .then((res) => {
        console.log("success", res);

        const commentIndex = commentAll.findIndex(
          (comment) => comment.commentId === commentId
        );

        const updatedLikes = [...commentLikes];
        updatedLikes[commentIndex] = !updatedLikes[commentIndex];
        setCommentLikes(updatedLikes);
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
        {userInfo && (
          <UserProfile>
            <Image
              src={userInfo.image ? userInfo.image : "/images/noProfile.jpg"}
              alt="프로필"
              width={42}
              height={42}
              style={{ borderRadius: "100%" }}
            />
          </UserProfile>
        )}
        <CommentsForm>
          <CommentsInput
            value={comment}
            onKeyDown={handleKeyDown}
            onChange={handleCommentChange}
            placeholder="댓글 달기..."
          />
        </CommentsForm>
      </CommentsContainer>
      {post && <CommentItem post={post} isReply={false} />}
      {commentAll ? (
        commentAll.map((comment, index) => (
          <div key={index}>
            <CommentItem
              post={post}
              comment={comment}
              commentLikes={commentLikes}
              handleLikeCommentClick={handleLikeCommentClick}
              handleShowModal={handleShowModal}
              index={index}
              isReply={true}
              commentInputRef={commentInputRef}
            />
          </div>
        ))
      ) : (
        <Empty>제일 먼저 댓글을 달아보세요 :0</Empty>
      )}
      {isEditModalOpen && (
        <CommentDeleteModal
          onDelete={handleCommentDelete}
          onCancel={handleCloseModal}
        />
      )}
      <Footer />
    </Container>
  );
};

export default Comments;

const Container = styled.section`
  width: 100%;
  overflow-y: scroll;
`;

const CommentsContainer = styled.div`
  width: 100%;
  height: 80px;
  border-top: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  padding: 10px 15px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const CommentsForm = styled.form`
  width: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;

const CommentsInput = styled.input`
  width: 100%;
  height: 37px;
  border-radius: 10px;
  padding-left: 12px;
`;

const Empty = styled.span`
  padding: 12px;
  color: #222222;
`;
