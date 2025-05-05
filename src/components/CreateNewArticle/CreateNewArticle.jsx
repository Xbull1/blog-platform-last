import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetForm, submitArticle } from '../../features/PostFormSlice'
import ArticleForm from '../ArticleForm/ArticleForm'

export default function CreateArticlePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { formData } = useSelector((state) => state.postForm)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
    return () => dispatch(resetForm())
  }, [dispatch, isAuthenticated, navigate])

  const handleSubmit = (articleData) => {
    dispatch(submitArticle({ articleData })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/')
      }
    })
  }
  return <ArticleForm initialData={formData} onSubmit={handleSubmit} />
}
