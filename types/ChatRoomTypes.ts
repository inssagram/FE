export interface ChatListData {
  id: number;
  chatroom_id: number;
  sender_id: number;
  sender_name: string;
  sender_image: string;
  friend_status: boolean;
  read_status: boolean;
  message: string;
  created_at: string;
  post_id: number;
  post_image: string;
}

export interface MemberInfoData {
  chatRoomId: number;
  memberList: {
    memberId: number;
    memberNickname: string;
    memberProfile: string | null;
    memberFollowerCounts: string | null;
    memberPostCounts: string | null;
    memberFollowState: boolean;
  };
}

export interface PreviousMessageData {
  chatMessageId: number;
  chatRoomId: number;
  createdAt: string;
  image: string | null;
  memberIdInShareObject: number;
  memberNicknameInShareObject: string;
  memberProfileInShareObject: string | null;
  message: string;
  receiverNickname: string;
  senderMemberId: number;
  senderNickname: string;
  senderProfile: string | null;
  shareObjectContents: string;
  shareObjectId: number;
  shareObjectImage: string;
  sharePostType: string;
  type: string;
}

export interface NewMessageData {
  type: string;
  chatRoomId: string;
  receiverMemberId: number;
  message: string;
}
