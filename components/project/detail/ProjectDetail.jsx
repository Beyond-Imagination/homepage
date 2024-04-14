'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/layout.module.css'
import ProjectDetailPhoto from '@/components/project/detail/ProjectDetailPhoto'
import { fetchProjectById } from '@/lib/api'
import useSWR from 'swr'
import { ProjectDetailContent } from '@/components/project/detail/ProjectDetailContent'

export default function ProjectDetail({ id }) {
  const [photoNum, selectPhotoNum] = useState(0)
  const [isSummaryVisible, setIsSummaryVisible] = useState(false)
  const [isPhotoVisible, setIsPhotoVisible] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const { data, error, isLoading } = useSWR(`/api/projects/${id}`, () => {
    return fetchProjectById(id)
  })

  if (error) {
    return <div>failed to load</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  const project = data
  return (
    <div
      className={`h-full pt-28 pb-60 text-white`}
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
            <div className={`flex justify-between items-center w-full`}>
              <h2 className="text-xl font-bold text-white">프로젝트 요약</h2>
              <span className="flex-grow"></span>{' '}
              <button onClick={() => setIsSummaryVisible(!isSummaryVisible)}>
                {isSummaryVisible ? '▲' : '▼'}
              </button>
            </div>

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
                  content={`${project.start_at} ~ ${project.end_at || ''}`}
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
                    project.prizes?.length > 0 ? (
                      project.prizes.map((v, index) => (
                        <div
                          key={index}
                        >{`${v.prize}, ${v.date} (${v.prize})  `}</div>
                      ))
                    ) : (
                      <div>X</div>
                    )
                  }
                ></ProjectDetailContent>

                <ProjectDetailContent
                  title={'첨부 파일'}
                  content={project.attachments?.map((v, index) => (
                    <div key={index}>
                      <Link
                        href={v.fields.file.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`hover:underline`}
                      >
                        {v.fields.file.fileName}
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
