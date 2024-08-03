'use client'
import ProjectCardList from '@/components/project/CardList.project'
import styles from '../../styles/layout.module.css'
import { fetchProjects } from '@/lib/api'
import useSWR from 'swr'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

function Project() {
  const { data, error, isLoading } = useSWR('/api/projects', fetchProjects)

  if (error) {
    return <div>failed to load</div>
  }

  if (isLoading) {
    return (
      <Box className={`w-full h-dvh flex justify-center items-center`}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div
      className="h-full pt-2 card-project"
      style={{ backgroundColor: '#141416' }}
    >
      <div className={`flex justify-center`}>
        <h1
          className={`text-4xl font-bold lg:my-12 my-6 text-gray-300 ${styles.HeaderFont}`}
        >
          About Projects
        </h1>
      </div>
      <div className="lg:px-40 md:px-24 px-6 pb-24">
        <ProjectCardList projects={data}></ProjectCardList>
      </div>
    </div>
  )
}

export default Project
