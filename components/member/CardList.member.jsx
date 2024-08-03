import Card from '@/components/member/Card.member'

function CardListMember({ title, members }) {
  return (
    <div className="md:mx-20 mx-6">
      <div className={`flex justify-center`}>
        <h1 className={`text-4xl font-bold my-12`}>{title}</h1>
      </div>
      <div
        className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-5`}
      >
        {members.map((member) => (
          <Card key={member.sys.id} item={member}></Card>
        ))}
      </div>
    </div>
  )
}

export default CardListMember
