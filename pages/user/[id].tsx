import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMobileScreen, faGear, faChevronDown, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/components/styled/my";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { useCallback} from "react";
import { useRouter } from "next/router";

export interface Post {
  id: number;
  userId: string;
  content: string;
  imageUrl: string;
}

interface MyProps {
  selectedUserName?: string;
}

const My: React.FC<MyProps> = ({ selectedUserName = "아무개" }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isClient, setIsClient] = useState(false);
  const sentinelRef = useRef(null);
  const feedViewConRef = useRef(null); // FeedViewCon의 ref를 추가
  const [userName, setUserName] = useState<string | null>(null);
  
  const router = useRouter();
  const userNameFromQuery = router.query.userName as string;
  const userIdFromPath = router.query.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    setIsClient(true);
    fetchData();
  }, []);

  const repeatData = useCallback(() => {
    const currentDataLength = posts.length;
    const newPosts = posts.map((post, index) => {
      return {
        ...post,
        id: post.id + currentDataLength,
      };
    });
    setPosts((prev) => [...prev, ...newPosts]);
  }, [posts]);

  useEffect(() => {
    const options = {
      root: feedViewConRef.current, // FeedViewCon의 ref를 root로 설정
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        repeatData();
      }
    }, options);

    const currentSentinel = sentinelRef.current;

    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [repeatData]);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <SC.Header>
        <FontAwesomeIcon icon={faGear} fontSize={"2rem"} />
        <SC.HeaderCon>
          <h2>{userIdFromPath || "Default ID"}</h2>
          <FontAwesomeIcon icon={faChevronDown} fontSize={"1.5rem"} />
        </SC.HeaderCon>
        <Link href="my/recommend" passHref>
          <FontAwesomeIcon icon={faUserPlus} fontSize={"2rem"} />
        </Link>
      </SC.Header>
      <SC.Container>
        <SC.ProfileLeft>
          <SC.MyProfile />
          <SC.UserName>{userNameFromQuery || "아무개"}</SC.UserName>
        </SC.ProfileLeft>
        <SC.MyIdContainer>
          <SC.UserId>{userIdFromPath || "랜덤 아이디"}</SC.UserId>
          <SC.MyIdGroup>
            <SC.ProfileEdit>
              <Link href="my/settings/profile" passHref>
                <SC.ProfileBox>팔로잉</SC.ProfileBox>
              </Link>
            </SC.ProfileEdit>
            <SC.ProfileEdit>
              <SC.ProfileBox>메세지</SC.ProfileBox>
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
          <Link href={`/my/feeds/${post.id}`} passHref key={post.id}>
            <SC.Feed style={{ backgroundImage: `url(${post.imageUrl})` }}></SC.Feed>
          </Link>
        ))}
        <SC.Sentinel ref={sentinelRef}></SC.Sentinel>
      </SC.FeedViewCon>
      <Footer />
    </>
  );
};

export default My;