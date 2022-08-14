import ProjectCardList from '@/components/project/CardList.project'
import { contentfulClientApi } from '@/utils/contentfu-api'

function Project(props) {
  const { projects } = props
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

//Server Side에서 API 요청을 위한 함수
export async function getServerSideProps(context) {
  const { req, res } = context
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'projects',
    // order: 'fields.join_date',
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

  return {
    props: {
      projects: entries,
    }, // will be passed to the page component as props
  }
}
