export interface UserInfoData {
  email: string;
  member_id: number;
  nickname: string;
  job: string;
  image: string;
}

export interface MemberInfoData {
  email: string;
  nickname: string;
  companyName: string;
  profilePic: string;
  description: string;
  followers: [
    {
      followerId: number;
      followerName: string;
      followerImage: string;
    }
  ];
  following: [
    {
      following_Id: number;
      following_Name: string;
      following_Image: string;
    }
  ];
}
