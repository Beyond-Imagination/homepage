'use client'
import ProjectDetail from '@/components/project/detail/ProjectDetail'
import { useSearchParams } from 'next/navigation'

function ProjectDetailPage() {
  const searchParams = useSearchParams()
  let projectId = searchParams.get('id')
  if (!projectId) {
    return <div>Project not found</div>
  }
  return <ProjectDetail id={projectId}></ProjectDetail>
}
export default ProjectDetailPage
