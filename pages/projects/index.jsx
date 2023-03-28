import ProjectCardList from '@/components/project/CardList.project'
import { contentfulClientApi } from '@/utils/contentfu-api'
import { useState, useEffect } from 'react'

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
    <div className={`h-full`}>
      <div className={`flex justify-center`}>
        <h1 className={`text-5xl font-bold my-12`}>프로젝트 소개</h1>
      </div>
      <ProjectCardList projects={projects}></ProjectCardList>
    </div>
  )
}
export default Project
