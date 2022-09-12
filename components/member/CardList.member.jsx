import Card from '@/components/member/Card.member'

function CardListMember({ members }) {
  return (
    <div
      className={`grid desktop:grid-cols-5 tablet:grid-cols-2 grid-cols-1 gap-4`}
    >
      {members.map((member) => (
        <Card key={member.sys.id} item={member}></Card>
      ))}
    </div>
  )
}

export default CardListMember
