import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as SC from "@/components/styled/my";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMobileScreen,
  faGear,
  faChevronDown,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
// import { useCallback } from "react";
// import { RootState } from "@/src/redux/Posts/store";
// import { ImageType, IntroType } from "@/src/redux/Posts/userProfileSlice";
import Footer from "@/components/Footer";
import getPostAllAxios from "@/services/postInfo/getPostAll";
import getMyPostAllAxios from "@/services/postInfo/getMyPostAll";

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  profilePic: string;
}

interface PostData {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  taggedMembers: string;
  hashTags: string;
}

const My: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  console.log(posts);
  const userInfo = useSelector((state: any) => state.user);
  console.log("User Info:", userInfo);
  // const [isClient, setIsClient] = useState(false);
  // const sentinelRef = useRef(null);
  // const feedViewConRef = useRef(null); // FeedViewCon의 ref를 추가
  // const userProfile = useSelector((state: RootState) => {
  //   const contents = state.profile.contents as ImageType[];
  //   const latestProfile = contents.slice().reverse()[0];
  //   return latestProfile;
  // });

  // const fetchPostData = async (memberId: string) => {
  //   try {
  //     const response = await getMyPostAllAxios(memberId);
  //     setPosts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (userInfo && userInfo.id) {
  //     fetchPostData(userInfo.id);
  //   }
  // }, [userInfo]);

  const fetchPostAllData = async () => {
    try {
      const response = await getPostAllAxios();
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostAllData();
  }, []);

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

  return (
    <>
      <SC.Header>
        <FontAwesomeIcon icon={faGear} fontSize={"2rem"} />
        <SC.HeaderCon>
          <h2>{userInfo.nickname}</h2>
          <FontAwesomeIcon icon={faChevronDown} fontSize={"1.5rem"} />
        </SC.HeaderCon>
        <Link href="my/recommend" passHref>
          <FontAwesomeIcon icon={faUserPlus} fontSize={"2rem"} />
        </Link>
      </SC.Header>

      <SC.Container>
        <SC.ProfileLeft>
          <Image
            src="/images/noProfile.jpg"
            alt="프로필"
            width={44}
            height={44}
            style={{ borderRadius: "100%" }}
          />
          <SC.UserName>{userInfo.nickname}</SC.UserName>
          {/* <SC.Intro>{userProfile?.content}</SC.Intro> */}
          <SC.Intro>안녕하세요 저는 조유리에유</SC.Intro>
        </SC.ProfileLeft>
        <SC.MyIdContainer>
          <SC.UserId>{userInfo.email}</SC.UserId>
          <SC.MyIdGroup>
            <SC.ProfileEdit>
              <Link href="my/settings/profile" passHref>
                <SC.ProfileBox>프로필 편집</SC.ProfileBox>
              </Link>
            </SC.ProfileEdit>
            <SC.ProfileEdit>
              <SC.ProfileBox>보관된 스토리 보기</SC.ProfileBox>
            </SC.ProfileEdit>
          </SC.MyIdGroup>
        </SC.MyIdContainer>
      </SC.Container>

      <SC.MyDataContainer>
        <SC.MyDataValue>
          <SC.DataName>게시물</SC.DataName>
          <SC.DataValue>77</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로워</SC.DataName>
          <SC.DataValue>485</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로우</SC.DataName>
          <SC.DataValue>557</SC.DataValue>
        </SC.MyDataValue>
      </SC.MyDataContainer>
      <SC.IconContainer>
        <FontAwesomeIcon icon={faTable} />
        <FontAwesomeIcon icon={faMobileScreen} />
        <FontAwesomeIcon icon={faBookmark} />
        <FontAwesomeIcon icon={faUser} />
      </SC.IconContainer>

      <SC.FeedViewCon>
        {posts.map((post) => (
          <Link href={`/my/feeds/${post.postId}`} key={post.postId} passHref>
            <Image
              src="/images/noImage.svg"
              alt="이미지"
              width={135}
              height={135}
            />
          </Link>
        ))}
        {/* <SC.Sentinel ref={sentinelRef}></SC.Sentinel> */}
      </SC.FeedViewCon>
      <Footer />
    </>
  );
};

export default My;
