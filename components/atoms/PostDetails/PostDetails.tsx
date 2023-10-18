import React, { useState } from "react";
import Link from "next/link";
import * as SC from "./styled";
import {
  faHeart as farHeart,
  faComment,
  faPaperPlane,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";

interface Post {
  id: number;
  name: string;
  content: string;
  imageUrl: string;
}

interface Account {
  id: number;
  name: string;
  userId: string;
  profileUrl: string;
}

interface PostDetailsProps {
  post: Post;
  account: Account | null;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, account }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <>
      <SC.PostImage src={post.imageUrl} alt="게시글" width={412} height={412} />
      <SC.PostDetails>
        <SC.IconArea>
          <SC.Left>
            <SC.LikeIcon
              icon={isLiked ? fasHeart : farHeart}
              style={{ color: isLiked ? "red" : "inherit" }}
              onClick={handleLikeClick}
            />
            <SC.CommentIcon icon={faComment} />
            {account ? (
              <Link href={`/direct/in/${account.id}`}>
                <SC.DmIcon icon={faPaperPlane} />
              </Link>
            ) : (
              <SC.DmIcon icon={faPaperPlane} />
            )}
          </SC.Left>
          <SC.Right>
            <SC.BoomMarkIcon
              icon={isSaved ? fasBookmark : farBookmark}
              onClick={handleSaveClick}
            />
          </SC.Right>
        </SC.IconArea>

        <SC.LikesArea>godchaani님 여러 명이 좋아합니다</SC.LikesArea>

        <SC.InfosArea>
          <SC.Infos>
            <SC.Writer>{post.name}</SC.Writer>
            <SC.Contents>{post.content}</SC.Contents>
          </SC.Infos>
          <SC.MoreComments>댓글 13개 모두 보기</SC.MoreComments>
          <SC.CreatedAt>2일전</SC.CreatedAt>
        </SC.InfosArea>
      </SC.PostDetails>
    </>
  );
};

export default PostDetails;
