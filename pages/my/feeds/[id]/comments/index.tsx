import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/my_feeds_comments";
import Image from "next/image";
import { faHeart, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import React, {useState} from "react";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { addComment, CommentType, deleteComment } from "@/src/redux/Posts/commentSlice"
import useLongPress from "./useLongPress";
import Modal from "./modal";

const Comments: React.FC = () => {

  const router = useRouter();
  const {id} = router.query;
  const [comment, setComment] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const comments = useSelector((state: RootState) => state.comments.comments); // 전역 상태에서 댓글 가져오기
  const dispatch = useDispatch();
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const handleCommentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }


  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      console.warn("빈 댓글은 제출할 수 없습니다.");
    } else {
      const newComment: CommentType = {
        id: comments.length + 1, // 댓글에 대한 고유 ID를 생성해야 합니다.
        userId: "gummy_jelly", // 사용자 ID를 가져오는 방법은 해당 애플리케이션의 로그인 시스템에 따라 다를 수 있습니다.
        profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg",
        content: comment.trim(),
      };

      dispatch(addComment(newComment));
      setComment("");
    }
  };

  const handleCommentLongPress = useLongPress(() => {
    setModalOpen(true);
  }, 1000);

    // 댓글을 클릭할 때 호출되는 함수
    const handleCommentClick = (commentId: number) => {
      // 댓글을 클릭할 때마다 선택된 댓글의 ID를 업데이트합니다.
      setSelectedCommentId(commentId);
    };
  

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (comment.trim() !== "") {
        handleCommentSubmit();
      } else {
        console.warn("Cannot submit an empty comment.");
      }
      event.preventDefault();
    }
  };

    const handleDeleteComment = async () => {
    if(selectedCommentId){
      dispatch(deleteComment(selectedCommentId));
    }
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    // 모달 닫기 로직 구현
    setModalOpen(false);
  };

  const handlePrev = () => {
    if(id){
    Router.push(`/my/feeds/${id}`)
    }
  }
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
          <SC.ID>정호인척 하는 유리</SC.ID>
          <SC.Content>곱창 먹고 싶다고요옹</SC.Content>
        </SC.Profile>
        <SC.ContentsDate>16주</SC.ContentsDate>
      </SC.Head>
      <SC.Details>
        <SC.CommentCont>
        {comments.map((comment: CommentType) => (
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
