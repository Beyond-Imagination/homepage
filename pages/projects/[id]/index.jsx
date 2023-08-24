import { useRouter } from 'next/router'
import { contentfulClientApi } from '@/utils/contentfu-api'
import ProjectCardList from '@/components/project/CardList.project'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/layout.module.css'
import styled from 'styled-components'
import ProjectDetailPhoto from '@/components/project/detail/ProjectDetailPhoto'

const SummaryToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const StyledProjectDetailPhoto = styled(ProjectDetailPhoto)`
  width: 686px;
  height: 387px;
`

const ProjectDetailContent = (props) => {
  return (
    <div className={`mb-5 flex items-center`}>
      <h2 className={`text-base font-bold text-gray-300 w-2/5`}>
        {props.title}
      </h2>
      <div className={`text-sm w-3/5`}>{props.content}</div>
    </div>
  )
}

function ProjectDetail() {
  const router = useRouter()
  const [photoNum, selectPhotoNum] = useState(0)
  const [entry, setEntry] = useState([])
  const [isSummaryVisible, setIsSummaryVisible] = useState(false)
  const { id } = router.query
  const [isPhotoVisible, setIsPhotoVisible] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const entries = await contentfulClientApi.getEntries({
        select: 'fields',
        content_type: 'projects',
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

      setEntry(entries)
    }

    fetchData()
  }, [])

  if (entry.length === 0) {
    return <div>wait</div>
  }

  const project = entry.items[0].fields
  return (
    <div
      className={`h-full pt-28 pb-60`}
      style={{ backgroundColor: '#141416' }}
    >
      <div className={`flex justify-center`}>
        <div
          className={`bg-zinc-800 ${styles.containerMain} text-center rounded-lg my-5`}
        >
          <h1 className={`text-4xl font-bold my-12 ${styles.ProjectFont}`}>
            {`${project.name}`}
          </h1>
        </div>
      </div>
      <div className={`py-6`}>
        <ProjectDetailPhoto
          project={project}
          photoNum={photoNum}
          selectPhotoNum={selectPhotoNum}
        ></ProjectDetailPhoto>
      </div>

      <div className={`flex justify-center my-5`}>
        <div className={`flex ${styles.containerMain}`}>
          <div
            className={`${styles.leftPanel} bg-zinc-800 rounded-lg mr-5 p-6`}
            style={{
              height: isSummaryVisible ? 'auto' : '90px',
              overflow: 'hidden',
              alignSelf: 'start',
            }}
          >
            <SummaryToggleContainer>
              <h2 className="text-xl font-bold text-white">프로젝트 요약</h2>
              <span className="flex-grow"></span>{' '}
              <button onClick={() => setIsSummaryVisible(!isSummaryVisible)}>
                {isSummaryVisible ? '▲' : '▼'}
              </button>
            </SummaryToggleContainer>

            {isSummaryVisible && (
              <div className="mt-6">
                <ProjectDetailContent
                  title={'참여멤버'}
                  content={project.members?.map((v, index) => (
                    <span key={index} className={`mr-2`}>
                      {`${v}`}
                      <br></br>
                    </span>
                  ))}
                ></ProjectDetailContent>

                <ProjectDetailContent
                  title={'프로젝트 기간'}
                  content={`${project.start_at} ~ ${project.end_at}`}
                ></ProjectDetailContent>
                <ProjectDetailContent
                  title={'기술 스택'}
                  content={project.tech_stacks?.map((v, index) => (
                    <span key={index} className={`mr-2`}>
                      {`${v}`}
                      <br></br>
                    </span>
                  ))}
                ></ProjectDetailContent>
                <ProjectDetailContent
                  title={'수상 경력'}
                  content={
                    project.prizes.length > 0 ? (
                      project.prizes?.map((v, index) => (
                        <div
                          key={index}
                        >{`${v.prize}, ${v.date} (${v.prize})  `}</div>
                      ))
                    ) : (
                      <div>
                        {`${project.prizes.value}`}
                        <br></br>
                      </div>
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
                      <br></br>
                    </div>
                  ))}
                ></ProjectDetailContent>
              </div>
            )}
          </div>

          <div
            className={`${styles.rightPanel} border border-gray-400 rounded-lg p-6`}
            style={{ alignSelf: 'start' }}
          >
            <h2 className="text-xl font-bold text-white mb-6">설명</h2>
            <div>
              {project.description.content?.map((v, index) => (
                <div key={index}>{v.content[0].value}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
