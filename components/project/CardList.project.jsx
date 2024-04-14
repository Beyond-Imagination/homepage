import Card from '@/components/project/Card.project'

function CardListProject({ projects }) {
  return (
    <div
      className={`grid desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-1 gap-12`}
    >
      {projects
        .sort((a, b) => {
          return new Date(b.fields.start_at) - new Date(a.fields.start_at)
        })
        .map((item, index) => (
          <Card key={item.sys.id} item={item}></Card>
        ))}
    </div>
  )
}

export default CardListProject
