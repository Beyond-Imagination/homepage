import Card from '@/components/member/Card.member'

function CardListMember({ title, members }) {
  return (
    <div>
      <div className={`flex justify-center`}>
        <h1 className={`text-4xl font-bold my-12`}>{title}</h1>
      </div>
      <div
        className={`grid desktop:grid-cols-4 tablet:grid-cols-3 grid-cols-1 gap-4`}
      >
        {members.map((member) => (
          <Card key={member.sys.id} item={member}></Card>
        ))}
      </div>
    </div>
  )
}

export default CardListMember
