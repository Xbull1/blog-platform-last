import { useState, useEffect } from 'react'
import styles from './ArticleForm.module.scss'

export default function ArticleForm({
  initialData = { title: '', description: '', body: '', tagList: [] },
  onSubmit,
  isEditing = false,
}) {
  const [formData, setFormData] = useState(initialData)
  const [tags, setTags] = useState(initialData.tagList.length > 0 ? [...initialData.tagList, ''] : [''])

  useEffect(() => {
    setFormData(initialData)
    setTags(initialData.tagList?.length > 0 ? [...initialData.tagList, ''] : [''])
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  const handleAddTag = () => {
    if (tags[tags.length - 1].trim() !== '') {
      setTags([...tags, ''])
    }
  }

  const handleDeleteTag = (index) => {
    if (tags.length > 1) {
      const newTags = tags.filter((_, i) => i !== index)
      setTags(newTags)
    } else {
      setTags([''])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nonEmptyTags = tags.filter((tag) => tag.trim() !== '')
    onSubmit({ ...formData, tagList: nonEmptyTags })
  }

  return (
    <form className={styles['create-new-article']} onSubmit={handleSubmit}>
      <h1 className={styles.title}>{isEditing ? 'Edit Article' : 'Create new article'}</h1>
      <label htmlFor="title-input" className={styles['title-create']}>
        Title
        <input
          id="title-input"
          type="text"
          placeholder="Title"
          name="title"
          className={styles['title-input']}
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="short-description" className={styles['create-short-description']}>
        Short description
        <input
          id="short-description"
          type="text"
          name="description"
          placeholder="Short description"
          className={styles['short-description']}
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="text" className={styles['text-create']}>
        Text
        <textarea
          id="text"
          placeholder="Text"
          name="body"
          className={styles.text}
          value={formData.body}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="tags" className={styles['create-tags']}>
        Tags
        <div className={styles['tags-container']}>
          {tags.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={styles['tags-main']}>
              <input
                type="text"
                placeholder="Tag"
                value={tag}
                className={styles.tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
              {tags.length > 1 && (
                <button type="button" className={styles['delete-tag']} onClick={() => handleDeleteTag(index)}>
                  Delete
                </button>
              )}
              {index === tags.length - 1 && (
                <button
                  type="button"
                  className={styles['create-tag']}
                  onClick={handleAddTag}
                  disabled={tag.trim() === ''}
                >
                  Add tag
                </button>
              )}
            </div>
          ))}
        </div>
      </label>
      <button type="submit" className={styles['send-button']}>
        Send
      </button>
    </form>
  )
}
