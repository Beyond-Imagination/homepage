'use client'
import ProjectDetail from '@/components/project/detail/ProjectDetail'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

const ProjectDetailPage: FC = () => {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('id')
  if (!projectId) {
    return <div>Project not found</div>
  }
  return <ProjectDetail id={projectId}></ProjectDetail>
}

export default ProjectDetailPage
