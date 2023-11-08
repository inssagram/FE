import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import * as SC from "@/components/styled/my_feeds_comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteComment } from "@/src/redux/Posts/commentSlice";
import Modal from "./modal";
import useLongPress from "./useLongPress";
import { PageHeader } from "@/components/atoms/Header";
import { CommentItem } from "@/components/atoms/Item";
import Footer from "@/components/Footer";
import postLikeCommentAxios from "@/services/postInfo/postLikeComment";
import getCommentAllAxios from "@/services/postInfo/getCommentAll";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";

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
  const [postDetail, setPostDetail] = useState<PostItemData | null>(null);
  const [comment, setComment] = useState("");
  const [commentAll, setCommentAll] = useState<CommentItemData[]>([]);
  const [isLikeComment, setIsLikeComment] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const pageTitle = "댓글";

  // 게시글 상세 조회
  const fetchPostDetailData = async (postId: number) => {
    try {
      const response = await getPostDetailAxios(postId);
      setPostDetail(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 게시글 모든 댓글 조회
  const fetchCommentAllData = async (postId: number) => {
    try {
      const response = await getCommentAllAxios(postId);
      setCommentAll(response.data);
    } catch (error) {
      console.error("error fetching comments", error);
    }
  };

  // 댓글 좋아요
  const handleLikeCommentClick = (commentId: number) => {
    postLikeCommentAxios(commentId)
      .then((response) => {
        console.log(
          "게시물 좋아요가 서버에 성공적으로 전송되었습니다.",
          response
        );
        setIsLikeComment(true);
      })
      .catch((error) => {
        console.error(
          "게시물 좋아요를 서버로 전송하는 중 오류가 발생했습니다.",
          error
        );
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
        console.error("게시물 ID 또는 토큰이 유효하지 않습니다.");
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
          console.error("댓글 제출 중 오류 발생:", error);
        });
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentLongPress = useLongPress(() => {
    setModalOpen(true);
  }, 1000);

  const handleEditCommentClick = (commentId: number) => {
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

  return (
    <SC.Container>
      <PageHeader title={pageTitle} />

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
          <SC.CommentsInput
            value={comment}
            onKeyDown={handleKeyDown}
            onChange={handleCommentChange}
            placeholder="댓글 달기..."
          />

          <SC.SmileIcon>
            <FontAwesomeIcon icon={faFaceSmile} fontSize={"2rem"} />
          </SC.SmileIcon>
        </SC.CommentsForm>
      </SC.CommentsContainer>

      {postDetail && <CommentItem post={postDetail} />}
      {commentAll.length > 0 ? (
        commentAll.map((comment, index) => (
          <div
            key={index}
            // onMouseDown={handleCommentLongPress.onMouseDown}
            onClick={() => handleEditCommentClick(comment.commentId)}
          >
            <CommentItem
              post={postDetail}
              comment={comment}
              isLikeComment={isLikeComment}
              handleLikeCommentClick={handleLikeCommentClick}
              isReply
            />
          </div>
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}
      {isModalOpen && selectedCommentId !== null && (
        <Modal onDelete={handleDeleteComment} onCancel={handleCancelDelete} />
      )}
      <Footer />
    </SC.Container>
  );
};

export default Comments;
