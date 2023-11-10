import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import * as SC from "@/components/styled/my";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMobileScreen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import { handleError } from "@/utils/errorHandler";
import { MyPageHeader } from "@/components/atoms/Header";
import Footer from "@/components/Footer";
import getUserDetailAxios from "@/services/userInfo/getUserDetail";
import getMyPostAllAxios from "@/services/postInfo/getMyPostAll";

export interface Post {
  id: number;
  userId: string;
  content: string;
  imageUrl: string;
}

interface MyProps {
  selectedUserName?: string;
}

const User: React.FC<MyProps> = () => {
  const [userInfo, setUserInfo] = useState<any>();
  console.log(userInfo);
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);
  const [isClient, setIsClient] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const sentinelRef = useRef(null);
  const feedViewConRef = useRef(null);

  const router = useRouter();
  const { nickname } = router.query;

  // const userNameFromQuery = router.query.userName as string;
  // const userIdFromPath = router.query.id as string;

  const fetchUserDetailData = async (nickname: string) => {
    try {
      const res = await getUserDetailAxios(nickname);
      setUserInfo(res);
    } catch (err) {
      handleError(err, "Error fetcing member detail:");
    }
  };

  useEffect(() => {
    if (nickname) {
      fetchUserDetailData(nickname);
    }
  }, [nickname]);

  const fetchMyPostAllData = async (memberId: number) => {
    try {
      const res = await getMyPostAllAxios(memberId);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching posts:");
      setLoading(true);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.nickname) {
      fetchMyPostAllData(userInfo.memberId);
    }
  }, [userInfo]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       handleError(err, "데이터를 불러오는 데 실패했습니다.");
  //     }
  //   };
  //   setIsClient(true);
  //   fetchData();
  // }, []);

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
  //     root: feedViewConRef.current,
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
      <MyPageHeader userInfo={userInfo} isNotMe={true} />

      <SC.Container>
        <SC.Profile>
          <Image
            src="/images/noProfile.jpg"
            alt="프로필"
            width={77}
            height={77}
            style={{ borderRadius: "100%" }}
          />
        </SC.Profile>

        <SC.MyDescContainer>
          <SC.Intro>
            <SC.Id>닉네임</SC.Id>
            <SC.Company>직업</SC.Company>
          </SC.Intro>
          <SC.EditArea>
            <SC.Edit>
              <Link href="my/settings/profile" passHref>
                <SC.Desc>팔로잉</SC.Desc>
              </Link>
            </SC.Edit>
            <SC.Edit>
              <SC.Desc>메세지 보내기</SC.Desc>
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
        <FontAwesomeIcon icon={faTable} />
        <FontAwesomeIcon icon={faMobileScreen} />
        <FontAwesomeIcon icon={faBookmark} />
        <FontAwesomeIcon icon={faUser} />
      </SC.IconContainer>

      {/* <SC.FeedViewCon>
        {posts.map((post) => (
          <Link href={`/my/feeds/${post.id}`} passHref key={post.id}>
            <SC.Feed
              style={{ backgroundImage: `url(${post.imageUrl})` }}
            ></SC.Feed>
          </Link>
        ))}
        <SC.Sentinel ref={sentinelRef}></SC.Sentinel>
      </SC.FeedViewCon> */}

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

export default User;
