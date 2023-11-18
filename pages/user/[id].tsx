import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import * as SC from "@/components/styled/my";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMobileScreen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { MyPageHeader } from "@/components/atoms/Header";
import { FollowButton } from "@/components/atoms/Button";
import Footer from "@/components/Footer";
import getUserDetailAxios from "@/services/userInfo/getUserDetail";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import getMemberPostAllAxios from "@/services/postInfo/getMemberPostAll";

interface MemberData {
  email: string;
  memberId: number;
  nickname: string;
  companyName: string;
  profilePic: string;
  followers: [followerId: number, followerName: string];
  following: string[];
  posts: number;
}

interface PostData {
  memberId: number;
  nickName: string;
  followed: boolean;
  postId: number;
  image: string[];
  contents: string;
  postLike: boolean;
  bookmarked: boolean;
  likeCount: number;
  createdAt: string;
  commentsCounts: number;
  location: string;
  taggedMemberIds: string;
}

interface MyProps {
  memberInfo: MemberData;
  posts: PostData;
  selectedUserName?: string;
}

const User: React.FC<MyProps> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [memberInfo, setMemberInfo] = useState<MemberData>();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  // const [isClient, setIsClient] = useState(false);
  // const sentinelRef = useRef(null);
  // const feedViewConRef = useRef(null);

  const router = useRouter();
  const { id } = router.query;

  // const userNameFromQuery = router.query.userName as string;
  // const userIdFromPath = router.query.id as string;

  // 특정 유저 상세 정보 조회
  const fetchUserDetailData = async (id: number) => {
    try {
      const res = await getUserDetailAxios(id);
      setMemberInfo(res.data);
      getFollowStatus(res.data.followers);
    } catch (err) {
      handleError(err, "Error fetcing member detail:");
    }
  };

  // 특정 유저가 작성한 게시글 조회
  const fetchMyPostAllData = async (memberId: number) => {
    try {
      const res = await getMemberPostAllAxios(memberId);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching posts:");
      setLoading(true);
    }
  };

  // 팔로우 상태
  const getFollowStatus = (memberInfo) => {
    if (userInfo) {
      const isFollowing = memberInfo.some(
        (follower) => follower.followerName === userInfo.nickname
      );
      setIsFollowing(isFollowing);
    }
  };

  const handleFollowClick = async (followId: number) => {
    try {
      const response = await postMemberFollowAxios(followId);
      console.log("success", response);
      setIsFollowing((setIsFollowing) => !setIsFollowing);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetailData(id);
      fetchMyPostAllData(id);
    }
  }, [id]);

  return (
    <>
      {userInfo && memberInfo && (
        <MyPageHeader
          userInfo={userInfo}
          memberInfo={memberInfo}
          isNotMe={true}
        />
      )}

      {memberInfo && (
        <SC.Container>
          <SC.Profile>
            <Image
              src={
                memberInfo.profilePic
                  ? memberInfo.profilePic
                  : "/images/noProfile.jpg"
              }
              alt="프로필"
              width={77}
              height={77}
              style={{ borderRadius: "100%" }}
            />
          </SC.Profile>

          <SC.MyDescContainer>
            <SC.Intro>
              <SC.Id>{memberInfo.nickname}</SC.Id>
              <SC.Company>{memberInfo.companyName}</SC.Company>
            </SC.Intro>
            <SC.DetailArea>
              <FollowButton
                onClick={() => handleFollowClick(id)}
                isFollowing={isFollowing}
              />
              <SC.Detail href="/direct/new">
                <SC.Desc>메세지 보내기</SC.Desc>
              </SC.Detail>
            </SC.DetailArea>
          </SC.MyDescContainer>
        </SC.Container>
      )}

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
        {posts.length > 0 && loading ? (
          <SC.Loading>
            <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
          </SC.Loading>
        ) : (
          posts.map((post) => (
            <Link key={post.postId} href={`/my/feeds/${post.postId}`} passHref>
              {post.image.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="이미지"
                  width={135}
                  height={135}
                />
              ))}
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
