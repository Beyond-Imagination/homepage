import CardProject from '@/components/project/Card.project'
import { Project } from '@/lib/api'
import { Entry } from 'contentful'

interface CardListProjectProps {
  projects: Entry<Project>[]
}

const CardListProject: React.FC<CardListProjectProps> = ({ projects }) => {
  return (
    <div className={`grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12`}>
      {projects
        .sort((a, b) => {
          return (
            new Date(b.fields.start_at).getTime() -
            new Date(a.fields.start_at).getTime()
          )
        })
        .map((item) => (
          <CardProject key={item.sys.id} item={item}></CardProject>
        ))}
    </div>
  )
}

export default CardListProject
