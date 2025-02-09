/* eslint-disable @next/next/no-img-element */
import Name from '@/components/member/Namemember'
import Description from '@/components/member/Descriptionmember'
import styles from '../../styles/Home.module.css'

interface MemberProps {
  item: {
    fields: {
      captain: boolean
      photo: string
      name: string
      company: string
      join_date?: string
      leave_date?: string
      description: string
    }
  }
}

const CardMember: React.FC<MemberProps> = ({ item }) => {
  const { captain, photo, name, company, description } = item.fields

  return (
    <div className={`${styles.member_wrap}`}>
      <div className={`${styles.member} ${captain ? styles.captain : ''}`}>
        <div className="flex justify-center mb-4 h-[23rem]">
          <img
            alt={`${name} image`}
            src={photo}
            className="w-full h-full object-cover"
          />
        </div>

        <Name name={name} company={company} />
        <Description description={description} />
      </div>
    </div>
  )
}

export default CardMember
