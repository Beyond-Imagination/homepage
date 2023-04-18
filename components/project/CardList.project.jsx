import Card from '@/components/project/Card.project'

function CardListProject({ projects }) {
  const items = projects.items || [] // items가 undefined인 경우, 빈 배열([])로 대체

  return (
    <div
      className={`grid desktop:grid-cols-4 tablet:grid-cols-2 grid-cols-1 gap-4`}
    >
      {items
        .sort((a, b) => {
          return new Date(b.fields.end_at) - new Date(a.fields.end_at)
        })
        .map((item, index) => (
          <Card key={item.sys.id} item={item}></Card>
        ))}
    </div>
  )
}

export default CardListProject
