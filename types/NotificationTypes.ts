export interface NotificationData {
  id: number;
  sender_id: number;
  sender_name: string;
  sender_image: string;
  friend_status: boolean;
  read_status: boolean;
  post_id: number;
  post_image: string;
  message: string;
  created_at: string;
}
