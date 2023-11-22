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

export interface MemberInfoData {
  type: string;
  postId: number;
  memberId: number;
  nickName: string;
  memberImage: string | null;
  image: [string];
  contents: string;
  location: string | null;
  likeCount: number;
  commentsCounts: number;
  taggedMemberIds: number;
  hashTags: [];
  createdAt: string;
  postLike: boolean;
  bookmarked: boolean;
  followed: boolean;
}

export interface LikedPostMemberData {
  memberId: number;
  memberNickname: string;
  memberProfile: string;
  followedState: boolean;
}
