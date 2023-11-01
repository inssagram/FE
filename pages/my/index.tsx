// import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as SC from "@/components/styled/my";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMobileScreen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import { MyPageHeader } from "@/components/atoms/Header";
import Footer from "@/components/Footer";
import { RootState } from "@/src/redux/Posts/store";
import getPostAllAxios from "@/services/postInfo/getPostAll";
import getMyPostAllAxios from "@/services/postInfo/getMyPostAll";

interface UserInfo {
  email: string;
  member_id: number;
  nickname: string;
  job: string;
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

interface MyProps {
  userInfo: Object;
  post: PostData;
}

const My: React.FC<MyProps> = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const userInfo: UserInfo | undefined = useSelector(
    (state: RootState) => state.user.member
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPostAllData = async () => {
    try {
      const response = await getPostAllAxios();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(true);
    }
  };

  // const fetchPostData = async (memberId: number) => {
  //   try {
  //     const response = await getMyPostAllAxios(memberId);
  //     setPosts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (userInfo && userInfo.member_id) {
  //     fetchPostData(userInfo.member_id);
  //   }
  // }, [userInfo]);

  useEffect(() => {
    fetchPostAllData();
  }, []);

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

  return (
    <>
      <MyPageHeader userInfo={userInfo} />

      <SC.Container>
        <SC.Profile>
          <Image
            src="/images/noProfile.jpg"
            alt="프로필"
            width={77}
            height={77}
            style={{ borderRadius: "100%" }}
          />
          {/* <Image
            src={userInfo.profilePic}
            alt="프로필"
            width={77}
            height={77}
            style={{ borderRadius: "100%" }}
          /> */}
        </SC.Profile>

        <SC.MyDescContainer>
          <SC.Id>{userInfo.nickname}</SC.Id>
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

      <SC.Content>
        {loading ? (
          <SC.Loading>
            <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
          </SC.Loading>
        ) : (
          posts.map((post) => (
            <Link key={post.postId} href={`/my/feeds/${post.postId}`} passHref>
              <Image
                src="/images/noImage.svg"
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
