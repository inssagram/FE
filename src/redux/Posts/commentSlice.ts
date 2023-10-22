import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommentType {
  id: number;
  userId: string;
  profile: string;
  content: string;
}

interface CommentState {
  comments: CommentType[];
}

const initialState: CommentState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<CommentType>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
