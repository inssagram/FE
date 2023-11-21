import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/components/styled/my_recommend";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import getUserRecommendAxios from "@/services/userInfo/getUserRecommed";
import Image from "next/image";

export interface Post {
  id: number;
  userId: string;
  userName: string;
  introduce: string;
  image: string;
  nickname: string;
  job: string;
  member_id: number;
}

interface MyProps {
  selectedUserName?: string;
}

const Recommend: React.FC<MyProps> = ({ selectedUserName = "아무개" }) => {
  const router = useRouter();
  const { id } = router.query;

  const [recommendPosts, setRecommendPosts] = useState<Post[]>([]);
  const [following, setFollowing] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
  try {
    console.log("Fetching data...");
    const response = await getUserRecommendAxios(Number(id));
    console.log("Response:", response);

    const { data } = response;

    if (data && data.content) {
      // Assuming "content" contains the array of user data
      setRecommendPosts(data.content);
      setFollowing(data.content.map(() => false));
    } else {
      // Handle the case where the data structure is unexpected
      console.error("Unexpected data structure:", data);
      setError("Failed to fetch recommendations. Unexpected data structure.");
    }
  } catch (error) {
    console.error("Failed to fetch the data.", error);
    setError("Failed to fetch recommendations. Please try again later.");
  }
};

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, [id]);

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
        <SC.H1>팔로우할 만한 계정 둘러보기</SC.H1>
      </SC.Header>

      <SC.RecommendCont>
        <SC.Recommend>추천</SC.Recommend>

        {error && <p>{error}</p>}

        {recommendPosts.map((post, index) => (
  <Link href={`/user/${post.member_id}`} key={index}>
    <SC.UserCont>
      {post.image ? (
        <SC.UserProfile>
          {/* Render the actual profile image */}
          <Image
            src={post.image} // Replace with the correct image source property
            alt={`Profile Image of ${post.nickname}`}
            width={100} // Adjust the width accordingly
            height={100} // Adjust the height accordingly
          />
        </SC.UserProfile>
      ) : (
        <SC.UserProfile>
          {/* Render the placeholder image if post.image is null */}
          <Image
            src="/images/noProfile.jpg"
            alt="No Profile Image"
            width={50} // Adjust the width accordingly
            height={50} // Adjust the height accordingly
          />
        </SC.UserProfile>
      )}
              <SC.UserStatus>
                <SC.UserId>{post.nickname}</SC.UserId>
                {post.job && <SC.UserIntro>{post?.job}</SC.UserIntro>}
              </SC.UserStatus>
              <SC.FollowButton
                onClick={() => handleFollow(index)}
                className={following[index] ? "following" : ""}
              >
                {following[index] ? "팔로잉" : "팔로우"}
              </SC.FollowButton>
            </SC.UserCont>
          </Link>
        ))}
      </SC.RecommendCont>
    </SC.Container>
  );
};

export default Recommend;