'use client'
import ProjectCardList from '@/components/project/CardList.project'
import styles from '../../styles/layout.module.css'
import { fetchProjects } from '@/lib/api'
import useSWR from 'swr'

function Project() {
  const { data, error, isLoading } = useSWR('/api/projects', fetchProjects)

  if (error) {
    return <div>failed to load</div>
  }

  if (isLoading) {
    return <div>loading...</div>
  }

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
        <ProjectCardList projects={data}></ProjectCardList>
      </div>
    </div>
  )
}

export default Project
