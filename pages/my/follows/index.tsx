import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/my_recommend";
import Image from "next/image";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export interface Post {
  id: number;
  userId: string;
  userName: string;
  introduce: string;
}

interface MyProps {
  selectedUserName?: string;
}

const API_ENDPOINT = "http://localhost:4000/recommend";

const Follows: React.FC<MyProps> = ({ selectedUserName = "아무개" }) => {
  const router = useRouter();
  const { id } = router.query;

  const [recommendPosts, setRecommendPosts] = useState<Post[]>([]);
  const [following, setFollowing] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { userId } = router.query; // URL 경로에서 userId 가져오기
  const userName = router.query.userName; // URL 쿼리에서 userName 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const { data } = await axios.get(API_ENDPOINT);
        console.log("Data fetched:", data);
        
        setRecommendPosts(data);
        setFollowing(data.map(() => false)); // Initialize follow array
      } catch (error) {
        console.error("Failed to fetch the data.", error);
        setError("Failed to fetch recommendations. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleFollow = (index: number) => {
    const updatedFollowing = [...following];
    updatedFollowing[index] = !updatedFollowing[index];
    setFollowing(updatedFollowing);
  };

  const handlePrevClick = () => {
    router.push("/my");
  };

  return (
    <SC.Container>
      <SC.Header>
        <SC.Prev onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>팔로우</SC.H1>
      </SC.Header>

      <SC.RecommendCont>
        <SC.Recommend>내 팔로우</SC.Recommend>

        {error && <p>{error}</p>}

        {recommendPosts.map((post, index) => (
          <Link href={`/user/${post.userId}?userName=${post.userName}`} key={index}>
            <SC.UserCont>
              <SC.UserProfile />
              <SC.UserStatus>
                <SC.UserId>{post.userId}</SC.UserId>
                {post.introduce && <SC.UserIntro>{post?.introduce}</SC.UserIntro>}
                <SC.UserFollower>회원님을 팔로우합니다</SC.UserFollower>
              </SC.UserStatus>
              <SC.FollowButton
                onClick={() => handleFollow(index)}
                className={following[index] ? "following" : ""}
              >
                {following[index] ? "팔로우" : "팔로잉"}
              </SC.FollowButton>
            </SC.UserCont>
          </Link>
        ))}
      </SC.RecommendCont>
    </SC.Container>
  );
};

export default Follows;
