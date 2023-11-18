export interface PostDetailData {
  type: string;
  memberId: number;
  memberImage: string;
  nickName: string;
  followed: boolean;
  postId: number;
  image: [string];
  contents: string;
  createdAt: string;
  postLike: boolean;
  likeCount: number;
  commentsCounts: number;
  bookmarked: boolean;
  hashTags: [];
  location: null;
  taggedMemberIds: number;
}
