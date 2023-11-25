import Link from "next/link";
import Image from "next/image";
import * as SC from "@/components/styled/atoms_data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faTable,
  faMobileScreen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { PostDetailData } from "@/types/PostTypes";

interface MyDataProps {
  memberId: number;
  posts: PostDetailData[] | undefined;
  bookmarkedPost: PostDetailData[] | undefined;
  taggedPost: PostDetailData[] | undefined;
  isShowBookmarked: boolean;
  isShowTagged: boolean;
  handlePostIconClick: () => void;
  handleBookmarkIconClick: () => void;
  handleTaggedIconClick: () => void;
  loading: boolean;
}

export const MyData: React.FC<MyDataProps> = ({
  memberId,
  posts = [],
  bookmarkedPost = [],
  taggedPost = [],
  isShowBookmarked,
  isShowTagged,
  handlePostIconClick,
  handleBookmarkIconClick,
  handleTaggedIconClick,
  loading,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <SC.Loading>
          <FontAwesomeIcon icon={faSpinner} fontSize={"24px"} />
        </SC.Loading>
      );
    }

    if (isShowBookmarked) {
      return renderBookmarkedContent();
    }

    if (isShowTagged) {
      return renderTaggedContent();
    }

    return renderPostsContent();
  };

  const renderPostsContent = () => {
    return posts.map((post) => (
      <Link key={post.postId} href={`/post/${post.postId}`} passHref>
        <Image
          src={post.image?.[0] || "/images/noImage.svg"}
          alt="이미지"
          width={135}
          height={135}
        />
      </Link>
    ));
  };

  const renderBookmarkedContent = () => {
    if (bookmarkedPost.length === 0) {
      return <SC.Text>저장된 게시물이 없습니다</SC.Text>;
    }

    return bookmarkedPost.map((post) => (
      <Link key={post.postId} href={`/post/${post.postId}`} passHref>
        <Image
          src={post.image?.[0] || "/images/noImage.jpg"}
          alt="이미지"
          width={135}
          height={135}
        />
      </Link>
    ));
  };

  const renderTaggedContent = () => {
    if (taggedPost.length === 0) {
      return <SC.Text>태그된 게시물이 없습니다</SC.Text>;
    }

    return taggedPost.map((post) => (
      <Link key={post.postId} href={`/post/${post.postId}`} passHref>
        <Image
          src={post.image?.[0] || "/images/noImage.svg"}
          alt="이미지"
          width={135}
          height={135}
        />
      </Link>
    ));
  };

  return (
    <>
      <SC.MyDataContainer>
        <SC.MyDataValue>
          <SC.DataName>게시물</SC.DataName>
          <SC.DataValue>{posts.length}</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로워</SC.DataName>
          <Link href={`/user/${memberId}/followers`}>
            <SC.DataValue>0</SC.DataValue>
          </Link>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로우</SC.DataName>
          <Link href={`/user/${memberId}/following`}>
            <SC.DataValue>0</SC.DataValue>
          </Link>
        </SC.MyDataValue>
      </SC.MyDataContainer>
      <SC.IconContainer>
        <FontAwesomeIcon icon={faTable} onClick={handlePostIconClick} />
        <FontAwesomeIcon icon={faMobileScreen} onClick={handlePostIconClick} />
        <FontAwesomeIcon icon={faBookmark} onClick={handleBookmarkIconClick} />
        <FontAwesomeIcon icon={faUser} onClick={handleTaggedIconClick} />
      </SC.IconContainer>
      <SC.Content>{renderContent()}</SC.Content>
    </>
  );
};

interface UserDataProps {
  memberId: number;
  posts: PostDetailData[] | undefined;
  taggedPost: PostDetailData[] | undefined;
  isShowTagged: boolean;
  handlePostIconClick: () => void;
  handleTaggedIconClick: () => void;
  loading: boolean;
}

export const UserData: React.FC<UserDataProps> = ({
  memberId,
  posts = [],
  taggedPost = [],
  isShowTagged,
  handlePostIconClick,
  handleTaggedIconClick,
  loading,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <SC.Loading>
          <FontAwesomeIcon icon={faSpinner} fontSize={"24px"} />
        </SC.Loading>
      );
    }

    if (isShowTagged) {
      return renderTaggedContent();
    }

    return renderPostsContent();
  };

  const renderPostsContent = () => {
    return posts.map((post) => (
      <Link key={post.postId} href={`/post/${post.postId}`} passHref>
        <Image
          src={post.image?.[0] || "/images/noImage.svg"}
          alt="이미지"
          width={135}
          height={135}
        />
      </Link>
    ));
  };

  const renderTaggedContent = () => {
    if (taggedPost.length === 0) {
      return <SC.Text>태그된 게시물이 없습니다.</SC.Text>;
    }

    return taggedPost.map((post) => (
      <Link key={post.postId} href={`/post/${post.postId}`} passHref>
        <Image
          src={post.image?.[0] || "/images/noImage.svg"}
          alt="이미지"
          width={135}
          height={135}
        />
      </Link>
    ));
  };

  return (
    <>
      <SC.MyDataContainer>
        <SC.MyDataValue>
          <SC.DataName>게시물</SC.DataName>
          {posts && <SC.DataValue>{posts.length}</SC.DataValue>}
        </SC.MyDataValue>
        <SC.MyDataValue>
          <Link href={`/user/${memberId}/followers`}>
            <SC.DataName>팔로워</SC.DataName>
          </Link>
          <SC.DataValue>0</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <Link href={`/user/${memberId}/following`}>
            <SC.DataName>팔로우</SC.DataName>
          </Link>
          <SC.DataValue>0</SC.DataValue>
        </SC.MyDataValue>
      </SC.MyDataContainer>

      <SC.IconContainer>
        <FontAwesomeIcon icon={faTable} onClick={handlePostIconClick} />
        <FontAwesomeIcon icon={faMobileScreen} onClick={handlePostIconClick} />
        <FontAwesomeIcon icon={faUser} onClick={handleTaggedIconClick} />
      </SC.IconContainer>

      <SC.Content>{renderContent()}</SC.Content>
    </>
  );
};
