import { useRouter } from 'next/router'
import { contentfulClientApi } from '@/utils/contentfu-api'
import ProjectCardList from '@/components/project/CardList.project'
import { useState } from 'react'
import photo from '../../photo'
import ProjectDetailPhoto from '@/components/project/detail/ProjectDetailPhoto'
import Link from 'next/link'

const ProjectDetailContent = (props) => {
  return (
    <div className={`mb-5`}>
      <div>
        <h2 className={`text-3xl font-bold mb-2`}>{props.title}</h2>
      </div>
      <div className={`py-4`}>
        <div className={`text-xl`}>{props.content}</div>
      </div>
    </div>
  )
}

function ProjectDetail(props) {
  const { entry } = props
  const [photoNum, selectPhotoNum] = useState(0)

  const project = entry.items[0].fields
  return (
    <div className={`h-full`}>
      <div className={`flex justify-center`}>
        <h1 className={`text-5xl font-bold my-12`}>
          {`${project.name} 프로젝트`}
        </h1>
      </div>
      <div></div>
      <ProjectDetailPhoto
        project={project}
        photoNum={photoNum}
        selectPhotoNum={selectPhotoNum}
      ></ProjectDetailPhoto>
      <div className={`flex gap-4 justify-end`}>
        {project.github?.map((git, index) => {
          return (
            <Link key={git.key} href={git.value}>
              <a target={`_blank`}>
                <div className={`flex items-center cursor-pointer`}>
                  <span className={`material-icons mr-1`}>link</span>
                  <span>{`${git.key} Github`}</span>
                </div>
              </a>
            </Link>
          )
        })}
        {project.youtube?.map((link, index) => {
          return (
            <Link key={index} href={link}>
              <a target={`_blank`}>
                <div className={`flex items-center cursor-pointer`}>
                  <span className={`material-icons mr-1`}>link</span>
                  <span>Youtube Link</span>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
      <ProjectDetailContent
        title={'프로젝트명'}
        content={project.name}
      ></ProjectDetailContent>
      <ProjectDetailContent
        title={'설명'}
        content={project.description.content?.map((v, index) => (
          <div key={index}>{v.content[0].value}</div>
        ))}
      ></ProjectDetailContent>
      <ProjectDetailContent
        title={'참여멤버'}
        content={project.members?.map((v, index) => (
          <span key={index} className={`mr-2`}>{`${v}`}</span>
        ))}
      ></ProjectDetailContent>

      <ProjectDetailContent
        title={'프로젝트 기간'}
        content={`${project.start_at} ~ ${project.end_at}`}
      ></ProjectDetailContent>
      <ProjectDetailContent
        title={'기술 스택'}
        content={project.tech_stacks?.map((v, index) => (
          <span key={index} className={`mr-2`}>{`${v}`}</span>
        ))}
      ></ProjectDetailContent>
      <ProjectDetailContent
        title={'수상 경력'}
        content={
          project.prizes.length > 0 ? (
            project.prizes?.map((v, index) => (
              <div key={index}>{`${v.prize}, ${v.date} (${v.prize})  `}</div>
            ))
          ) : (
            <div>{`${project.prizes.value}`}</div>
          )
        }
      ></ProjectDetailContent>
      <ProjectDetailContent
        title={'첨부 파일'}
        content={project.attachments?.map((v, index) => (
          <div key={index}>
            <Link href={v.fields.file.url}>
              <a
                href={v.fields.file.url}
                target="_blank"
                rel="noreferrer"
                className={`hover:underline`}
              >
                {v.fields.file.fileName}
              </a>
            </Link>
          </div>
        ))}
      ></ProjectDetailContent>
    </div>
  )
}

export default ProjectDetail
//Server Side에서 API 요청을 위한 함수
export async function getServerSideProps(context) {
  const { req, res } = context
  const { id } = context.query

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'projects',
    // order: 'fields.join_date',
    'sys.id': id,
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
      entry: entries,
    }, // will be passed to the page component as props
  }
}
