import CardMember from '@/components/member/Cardmember'

interface CardListMemberProps {
  title: string
  members: {
    sys: {
      id: string
    }
    fields: {
      captain: boolean
      photo: string
      name: string
      company: string
      join_date?: string
      leave_date?: string
      description: string
    }
  }[]
}

const CardListMember: React.FC<CardListMemberProps> = ({ title, members }) => {
  return (
    <div className="md:mx-20 mx-6">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold my-12">{title}</h1>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {members.map((member) => (
          <CardMember key={member.sys.id} item={member} />
        ))}
      </div>
    </div>
  )
}

export default CardListMember
