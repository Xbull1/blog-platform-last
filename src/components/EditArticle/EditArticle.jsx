import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData, resetForm, submitArticle } from '../../features/PostFormSlice'
import ArticleForm from '../ArticleForm/ArticleForm'

export default function EditArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { data: existingArticle } = useSelector((state) => state.article)
  const { formData } = useSelector((state) => state.postForm)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (slug && existingArticle) {
      dispatch(
        setFormData({
          title: existingArticle.title || '',
          description: existingArticle.description || '',
          body: existingArticle.body || '',
          tagList: existingArticle.tagList || [],
        })
      )
    }
    return () => dispatch(resetForm())
  }, [dispatch, slug, existingArticle])

  const handleSubmit = (articleData) => {
    dispatch(
      submitArticle({
        articleData,
        slug,
      })
    ).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/')
      }
    })
  }

  return <ArticleForm initialData={formData} onSubmit={handleSubmit} isEditing />
}
