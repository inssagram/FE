import { createSlice,  PayloadAction } from '@reduxjs/toolkit';


// 게시물 데이터 구조를 정의하는 타입
export interface PostType {
  id: number;
  userId: string;
  imageUrl: string;
  content: string;
  profile: string;
  // 필요한 경우 여기에 더 많은 필드를 추가할 수 있습니다.
}

// 게시물을 저장할 상태 타입 정의
interface PostState {
  posts: PostType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 초기 상태 정의
const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null
};

// 이제 slice를 생성합니다.
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostType>) {
      state.posts.push(action.payload);
    },
  },

 
});
export default postsSlice.reducer;

// 셀렉터를 만들어서 다른 컴포넌트에서 현재 상태를 쉽게 가져올 수 있도록 합니다.

