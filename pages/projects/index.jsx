import ProjectCardList from '@/components/project/CardList.project'
import { contentfulClientApi } from '@/utils/contentfu-api'
import { useState, useEffect } from 'react'
import styles from '../../styles/layout.module.css'

function Project() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchData() {
      const entries = await contentfulClientApi.getEntries({
        select: 'fields',
        content_type: 'projects',
      })

      const map = new Map()
      entries.includes.Asset.forEach((asset) => {
        const key = asset.sys.id
        const value = `https:${asset.fields.file.url}`
        map.set(key, value)
      })
      entries.items.forEach((item) => {
        let photos = []
        item.fields.photos.forEach((photo) => {
          photos.push(map.get(photo.sys.id))
        })
        item.fields.photos = photos
      })

      setProjects(entries)
    }

    fetchData()
  }, [])

  return (
    <div
      className="h-full pt-2 card-project"
      style={{ backgroundColor: '#141416' }}
    >
      <div className={`flex justify-center`}>
        <h1
          className={`text-5xl font-bold pt-12 my-28 text-gray-300 ${styles.HeaderFont}`}
        >
          About Projects
        </h1>
      </div>
      <div className="px-40 pb-24">
        <ProjectCardList projects={projects}></ProjectCardList>
      </div>
    </div>
  )
}
export default Project
