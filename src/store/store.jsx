import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/AuthSlice'
import postsSlice from '../features/PostsSlice'
import openPostSlice from '../features/OpenPostSlice'
import postFormSlice from '../features/PostFormSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    article: openPostSlice,
    postForm: postFormSlice,
  },
})
export default store
