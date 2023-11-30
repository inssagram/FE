import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { UserPageHeader } from "@/components/atoms/Header";
import { UserData } from "@/components/atoms/Data";
import Footer from "@/components/Footer";
import getUserDetailAxios from "@/services/userInfo/getUserDetail";
import getMemberPostAllAxios from "@/services/postInfo/getMemberPostAll";
import getTaggedPostAllAxios from "@/services/postInfo/getTaggedPostAll";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import { MemberInfoData } from "@/types/UserTypes";
import { PostDetailData } from "@/types/PostTypes";

const User: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [memberInfo, setMemberInfo] = useState<MemberInfoData | undefined>();
  const [posts, setPosts] = useState<PostDetailData[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [taggedPost, setTaggedPost] = useState<PostDetailData[] | undefined>(
    []
  );
  const [isShowPosts, setIsShowPosts] = useState(false);
  const [isShowTagged, setIsShowTagged] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const memberId: number = typeof id === "string" ? parseInt(id, 10) : -1;

  const fetchMemberPostAllData = useCallback(async (memberId: number) => {
    try {
      const res = await getMemberPostAllAxios(memberId);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching posts:");
      setLoading(true);
    }
  }, []);

  const fetchUserDetailData = useCallback(
    async (id: number) => {
      try {
        const res = await getUserDetailAxios(id);
        const memberInfoData = res.data;

        if (userInfo) {
          const isFollowing = memberInfoData.followers.some(
            (follower: { followerName: string }) =>
              follower.followerName === userInfo.nickname
          );
          setIsFollowing(isFollowing);
        }

        setMemberInfo(memberInfoData);
        await fetchMemberPostAllData(memberId);
      } catch (err) {
        handleError(err, "Error fetching member detail:");
      }
    },
    [userInfo, memberId, fetchMemberPostAllData]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (memberId !== -1) {
        await fetchUserDetailData(memberId);
      }
    };

    fetchData();
  }, [memberId, fetchUserDetailData]);

  const handleFollowClick = async (followId: number) => {
    try {
      const res = await postMemberFollowAxios(followId);
      console.log("success", res);
      setIsFollowing((setIsFollowing) => !setIsFollowing);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchTaggedPostAllData = async (memberId: number) => {
    try {
      const res = await getTaggedPostAllAxios(memberId);
      setTaggedPost(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching bookmarked posts:");
      setLoading(true);
    }
  };

  const handlePostIconClick = () => {
    setIsShowPosts(!isShowPosts);
    setIsShowTagged(false);
    if (!isShowPosts) {
      fetchMemberPostAllData(memberId);
    }
  };

  const handleTaggedIconClick = () => {
    setIsShowTagged(!isShowTagged);
    setIsShowPosts(false);
    if (!isShowTagged) {
      fetchTaggedPostAllData(memberId);
    }
  };

  const handleChatClick = () => {
    router.push(`/direct/new`);
  };

  return (
    <>
      {memberInfo && (
        <UserPageHeader
          memberInfo={memberInfo}
          memberId={memberId}
          isFollowing={isFollowing}
          handleFollowClick={handleFollowClick}
          handleChatClick={handleChatClick}
        />
      )}
      <UserData
        memberId={memberId}
        posts={posts}
        taggedPost={taggedPost}
        isShowTagged={isShowTagged}
        handlePostIconClick={handlePostIconClick}
        handleTaggedIconClick={handleTaggedIconClick}
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default User;
