import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import * as SC from "@/components/styled/my";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faTable,
  faMobileScreen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/errorHandler";
import Footer from "@/components/Footer";
import { MyHeader } from "@/components/atoms/Header";
import getMyPostAllAxios from "@/services/postInfo/getMyPostAll";
import getBookmarkPostAllAxios from "@/services/postInfo/getBookmarkPostAll";
import getTaggedPostAllAxios from "@/services/postInfo/getTaggedPostAll";
import { UserInfoData } from "@/types/UserTypes";
import { PostDetailData } from "@/types/PostTypes";

interface MyProps {
  userInfo: UserInfoData;
  post: PostDetailData;
}

const My: React.FC<MyProps> = () => {
  const userInfo = useSelector(
    (state: RootState) => state.user.member
  ) as UserInfoData;
  const [posts, setPosts] = useState<PostDetailData[] | null>([]);
  console.log(posts);
  const [bookmarkedPost, setBookmarkedPost] = useState<PostDetailData[] | null>(
    []
  );
  const [taggedPost, setTaggedPost] = useState<PostDetailData[]>([]);
  const [isShowBookmarked, setIsShowBookmarked] = useState(false);
  const [isShowTagged, setIsShowTagged] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("table");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMyPostAllData = async () => {
    try {
      const res = await getMyPostAllAxios();
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching posts:");
      setLoading(true);
    }
  };

  const fetchBookmarkPostAllData = async () => {
    try {
      const res = await getBookmarkPostAllAxios();
      setBookmarkedPost(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching bookmarked posts:");
      setLoading(true);
    }
  };

  const fetchTaggedPostAllData = async (memberId: number) => {
    try {
      const res = await getTaggedPostAllAxios(memberId);
      setTaggedPost(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching tagged posts:");
      setLoading(true);
    }
  };

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleBookmarkIconClick = () => {
    handleIconClick("bookmark");
    fetchBookmarkPostAllData();
    setIsShowBookmarked(!isShowBookmarked);
  };

  const handleTaggedIconClick = () => {
    handleIconClick("tagged");
    fetchTaggedPostAllData(userInfo.member_id);
    setIsShowTagged(!isShowTagged);
  };

  useEffect(() => {
    fetchMyPostAllData();
    handleIconClick("table");
  }, []);

  return (
    <>
      <MyHeader userInfo={userInfo} />

      <SC.Container>
        <SC.Profile>
          <Image
            src={userInfo.image ? userInfo.image : "/images/noProfile.jpg"}
            alt="프로필"
            width={77}
            height={77}
            style={{ borderRadius: "100%" }}
          />
        </SC.Profile>

        <SC.MyDescContainer>
          <SC.Intro>
            <SC.Id>{userInfo.nickname}</SC.Id>
            {userInfo.job ? (
              <SC.Company>{userInfo.job}</SC.Company>
            ) : (
              <Link href="/my/settings/profile" passHref>
                <SC.Company>직업을 입력해보세요</SC.Company>
              </Link>
            )}
            <SC.Company>{userInfo.job}</SC.Company>
          </SC.Intro>
          <SC.EditArea>
            <SC.Edit>
              <Link href="my/settings/profile" passHref>
                <SC.Desc>프로필 편집</SC.Desc>
              </Link>
            </SC.Edit>
            <SC.Edit>
              <SC.Desc>보관된 스토리 보기</SC.Desc>
            </SC.Edit>
          </SC.EditArea>
        </SC.MyDescContainer>
      </SC.Container>

      <SC.MyDataContainer>
        <SC.MyDataValue>
          <SC.DataName>게시물</SC.DataName>
          <SC.DataValue>77</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로워</SC.DataName>
          <Link href="/my/followers">
            <SC.DataValue>485</SC.DataValue>
          </Link>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로우</SC.DataName>
          <Link href="/my/follows">
            <SC.DataValue>557</SC.DataValue>
          </Link>
        </SC.MyDataValue>
      </SC.MyDataContainer>
      <SC.IconContainer>
        <FontAwesomeIcon
          icon={faTable}
          onClick={() => handleIconClick("table")}
        />
        <FontAwesomeIcon
          icon={faMobileScreen}
          onClick={() => handleIconClick("mobile")}
        />
        <FontAwesomeIcon icon={faBookmark} onClick={handleBookmarkIconClick} />
        <FontAwesomeIcon icon={faUser} onClick={handleTaggedIconClick} />
      </SC.IconContainer>

      <SC.Content>
        {loading ? (
          <SC.Loading>
            <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
          </SC.Loading>
        ) : selectedIcon === "bookmark" ? (
          isShowBookmarked ? (
            bookmarkedPost.length === 0 ? (
              <SC.Text>저장된 게시물이 없습니다</SC.Text>
            ) : (
              bookmarkedPost.map((post) => (
                <Link
                  key={post.postId}
                  href={`/my/feeds/${post.postId}`}
                  passHref
                >
                  <Image
                    src={post.image[0]}
                    alt="이미지"
                    width={135}
                    height={135}
                  />
                </Link>
              ))
            )
          ) : null
        ) : selectedIcon === "tagged" ? (
          isShowTagged ? (
            taggedPost.length === 0 ? (
              <SC.Text>태그된 게시물이 없습니다</SC.Text>
            ) : (
              taggedPost.map((post) => (
                <Link
                  key={post.postId}
                  href={`/my/feeds/${post.postId}`}
                  passHref
                >
                  <Image
                    src={post.image[0]}
                    alt="이미지"
                    width={135}
                    height={135}
                  />
                </Link>
              ))
            )
          ) : null
        ) : (
          posts.map((post) => (
            <Link key={post.postId} href={`/my/feeds/${post.postId}`} passHref>
              <Image
                src={post.image[0]}
                alt="이미지"
                width={135}
                height={135}
              />
            </Link>
          ))
        )}
        {/* <SC.Sentinel ref={sentinelRef}></SC.Sentinel> */}
      </SC.Content>
      <Footer />
    </>
  );
};

export default My;

// 무한스크롤
// const [isClient, setIsClient] = useState(false);
// const sentinelRef = useRef(null);
// const feedViewConRef = useRef(null); // FeedViewCon의 ref를 추가
// const userProfile = useSelector((state: RootState) => {
//   const contents = state.profile.contents as ImageType[];
//   const latestProfile = contents.slice().reverse()[0];
//   return latestProfile;
// });

// const repeatData = useCallback(() => {
//   const currentDataLength = posts.length;
//   const newPosts = posts.map((post, index) => {
//     return {
//       ...post,
//       id: post.id + currentDataLength,
//     };
//   });
//   setPosts((prev) => [...prev, ...newPosts]);
// }, [posts]);

// useEffect(() => {
//   const options = {
//     root: feedViewConRef.current, // FeedViewCon의 ref를 root로 설정
//     rootMargin: "0px",
//     threshold: 0.1,
//   };

//   const observer = new IntersectionObserver((entries) => {
//     if (entries[0].isIntersecting) {
//       repeatData();
//     }
//   }, options);

//   const currentSentinel = sentinelRef.current;

//   if (currentSentinel) {
//     observer.observe(currentSentinel);
//   }

//   return () => {
//     if (currentSentinel) {
//       observer.unobserve(currentSentinel);
//     }
//   };
// }, [repeatData]);

// if (!isClient) {
//   return null;
// }
