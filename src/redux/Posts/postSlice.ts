import { createSlice,  PayloadAction } from '@reduxjs/toolkit';

export type ImageUrlFunction = () => string;

// 게시물 데이터 구조를 정의하는 타입
export interface PostType {
  memberId: number;
  image: string[];
  contents: string;
  // 필요한 경우 여기에 더 많은 필드를 추가할 수 있습니다.
}

export interface CreatePostType {
  memberId: number;
  image: string[];
  contents: string;
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
  posts: [
    {
      "memberId":1,
      "image":["https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bradypus.jpg/450px-Bradypus.jpg"],
      "contents":"텍스트",
    },
    {
      "memberId":2,
      "image":["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"],
      "contents":"kkang.stylist 이번주 목요일21일 19시 kkst에서 니트가 최초공개됩니다👏... 더 보기",
    }
  ],
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
    editPost(state, action: PayloadAction<PostType>) {
      const editedPost = action.payload;
      state.posts = state.posts.map(post =>
        post.memberId === editedPost.memberId ? editedPost : post
      )},
      deletePost(state, action: PayloadAction<number>) {
        const postIdToDelete = action.payload;
        state.posts = state.posts.filter(post => post.memberId !== postIdToDelete);
      }      
  },

 
});

export const {addPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;

// 셀렉터를 만들어서 다른 컴포넌트에서 현재 상태를 쉽게 가져올 수 있도록 합니다.

