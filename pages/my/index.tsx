import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { MyPageHeader } from "@/components/atoms/Header";
import { MyData } from "@/components/atoms/Data";
import Footer from "@/components/Footer";
import getMyPostAllAxios from "@/services/postInfo/getMyPostAll";
import getTaggedPostAllAxios from "@/services/postInfo/getTaggedPostAll";
import getBookmarkPostAllAxios from "@/services/postInfo/getBookmarkPostAll";
import { UserInfoData } from "@/types/UserTypes";
import { PostDetailData } from "@/types/PostTypes";

interface MyProps {
  userInfo: UserInfoData;
  post: PostDetailData;
}

const My: React.FC<MyProps> = () => {
  const userInfo = useSelector(
    (state: RootState) => state.user.member
  ) as UserInfoData;
  const [posts, setPosts] = useState<PostDetailData[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmarkedPost, setBookmarkedPost] = useState<
    PostDetailData[] | undefined
  >([]);
  const [taggedPost, setTaggedPost] = useState<PostDetailData[] | undefined>(
    []
  );

  const [isShowPosts, setIsShowPosts] = useState(false);
  const [isShowBookmarked, setIsShowBookmarked] = useState(false);
  const [isShowTagged, setIsShowTagged] = useState(false);

  const fetchMyPostAllData = async () => {
    try {
      const res = await getMyPostAllAxios();
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching posts:");
      setLoading(true);
    }
  };

  const fetchBookmarkPostAllData = async () => {
    try {
      const res = await getBookmarkPostAllAxios();
      setBookmarkedPost(res.data);
      setLoading(false);
    } catch (err) {
      handleError(err, "Error fetching bookmarked posts:");
      setLoading(true);
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
    if (!isShowPosts) {
      fetchMyPostAllData();
    }
    setIsShowPosts(!isShowPosts);
    setIsShowBookmarked(false);
    setIsShowTagged(false);
  };

  const handleBookmarkIconClick = () => {
    if (!isShowBookmarked) {
      fetchBookmarkPostAllData();
    }
    setIsShowBookmarked(!isShowBookmarked);
    setIsShowPosts(false);
    setIsShowTagged(false);
  };

  const handleTaggedIconClick = () => {
    if (!isShowTagged) {
      fetchTaggedPostAllData(userInfo.member_id);
    }
    setIsShowTagged(!isShowTagged);
    setIsShowPosts(false);
    setIsShowBookmarked(false);
  };

  useEffect(() => {
    fetchMyPostAllData();
  }, []);

  return (
    <>
      <MyPageHeader userInfo={userInfo} />
      <MyData
        memberId={userInfo.member_id}
        posts={posts}
        bookmarkedPost={bookmarkedPost}
        taggedPost={taggedPost}
        isShowBookmarked={isShowBookmarked}
        isShowTagged={isShowTagged}
        handlePostIconClick={handlePostIconClick}
        handleBookmarkIconClick={handleBookmarkIconClick}
        handleTaggedIconClick={handleTaggedIconClick}
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default My;
