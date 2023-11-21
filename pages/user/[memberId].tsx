import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import * as SC from "@/components/styled/my";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faTable,
  faMobileScreen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/errorHandler";
import { UserPageHeader } from "@/components/atoms/Header";
import { FollowStatusButton } from "@/components/atoms/Button";
import Footer from "@/components/Footer";
import getUserDetailAxios from "@/services/userInfo/getUserDetail";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import getMemberPostAllAxios from "@/services/postInfo/getMemberPostAll";
import { MemberInfoData } from "@/types/UserTypes";
import { PostDetailData } from "@/types/PostTypes";

interface UserProps {
  memberInfo: MemberInfoData;
  posts: PostDetailData;
  selectedUserName?: string;
}

const User: React.FC<UserProps> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [memberInfo, setMemberInfo] = useState<MemberInfoData | undefined>();
  const [posts, setPosts] = useState<PostDetailData[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  // const [isClient, setIsClient] = useState(false);
  // const sentinelRef = useRef(null);
  // const feedViewConRef = useRef(null);

  const router = useRouter();
  const { memberId } = router.query;
  const withMemberId: number =
    typeof memberId === "string" ? parseInt(memberId, 10) : -1;

  const fetchUserDetailData = async (id: number) => {
    try {
      const res = await getUserDetailAxios(id);
      setMemberInfo(res.data);
      getFollowStatus(res.data.followers);
    } catch (err) {
      handleError(err, "Error fetcing member detail:");
    }
  };

  const getFollowStatus = (memberInfo: MemberInfoData) => {
    if (userInfo) {
      const isFollowing = memberInfo.followers.some(
        (follower) => follower.followerName === userInfo.nickname
      );
      setIsFollowing(isFollowing);
    }
  };

  const fetchMemberPostAllData = async (memberId: number) => {
    try {
      const res = await getMemberPostAllAxios(memberId);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching posts:");
      setLoading(true);
    }
  };

  const handleChatClick = () => {
    router.push(`/direct/new`);
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
    if (withMemberId !== -1) {
      fetchUserDetailData(withMemberId);
      fetchMemberPostAllData(withMemberId);
    }
  }, [withMemberId]);

  return (
    <>
      {memberInfo && <UserPageHeader memberInfo={memberInfo} />}
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
              <FollowStatusButton
                onClick={() => handleFollowClick(withMemberId)}
                isFollowing={isFollowing}
              />
              <SC.Desc onClick={handleChatClick}>메세지 보내기</SC.Desc>
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

      <SC.Content>
        {posts && posts.length > 0 && loading ? (
          <SC.Loading>
            <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
          </SC.Loading>
        ) : (
          posts &&
          posts.map((post) => (
            <Link key={post.postId} href={`/post/${post.postId}`} passHref>
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
