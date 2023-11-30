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
  memberId: number;
  memberNickname: string;
  memberProfile: string | null;
  memberFollowerCounts: string | null;
  memberPostCounts: string | null;
  memberFollowState: boolean;
}

export interface SendNewMessageData {
  type: string;
  chatRoomId: number;
  receiverMemberId: number;
  message: string;
}

export interface NewImageData {}

export interface PreviousMessageData {
  type: string;
  chatMessageId: number;
  chatRoomId: number;
  createdAt: string;
  image: string;
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
}
