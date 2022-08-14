import { useRouter } from 'next/router'

function ProjectDetail(props) {
  const router = useRouter()
  const { id } = router.query

  return <div>Project Detail id: {id}</div>
}

export default ProjectDetail
