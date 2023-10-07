import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMobileScreen, faGear, faChevronDown, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/styled/my";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";

export interface Post {
  id: number;
  userId: string;
  content: string;
  imageUrl: string;
}

const My: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isClient, setIsClient] = useState(false); // 클라이언트 사이드 체크용 state 추가

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 마운트되면 클라이언트 사이드라고 판단
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  }, []);

  if (!isClient) {
    // 클라이언트 사이드가 아니면 null 또는 로딩 컴포넌트 반환
    return null; // or <LoadingComponent />;
  }
  return (
    <>
      <SC.Header>
        <FontAwesomeIcon icon={faGear} fontSize={"2rem"} />
        <SC.HeaderCon>
          <h2>gummy_jelly</h2>
          <FontAwesomeIcon icon={faChevronDown} fontSize={"1.5rem"} />
        </SC.HeaderCon>
        <FontAwesomeIcon icon={faUserPlus} fontSize={"2rem"} />
      </SC.Header>
      <SC.Container>
        <SC.ProfileLeft>
          <SC.MyProfile />
          <SC.UserName>조유리</SC.UserName>
        </SC.ProfileLeft>
        <SC.MyIdContainer>
          <SC.UserId>gummy_bear</SC.UserId>
          <SC.MyIdGroup>
            <SC.ProfileEdit>
              <SC.ProfileBox>프로필 편집</SC.ProfileBox>
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
          <Link href={`/my/feeds/${post.id}`} passHref key={post.id}>
            <SC.Feed style={{ backgroundImage: `url(${post.imageUrl})` }}></SC.Feed>
          </Link>
        ))}
      </SC.FeedViewCon>
      <Footer />
    </>
  );
};

export default My;
