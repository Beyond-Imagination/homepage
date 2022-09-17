import Name from '@/components/member/Name.member'
import Period from '@/components/member/Period.member'
import Description from '@/components/member/Description.member'
import styles from '../../styles/Home.module.css'

function CardMember({ item }) {
  const { captain, photo, name, company, join_date, leave_date, description } =
    item.fields
  return (
    <div className={`${styles.member_wrap}`}>
      <div
        className={`${styles.member} ${
          captain ? styles.captain : ''
        } h-full p-2`}
      >
        <div className={`flex justify-center mb-4`}>
          <img
            alt={`${name} image`}
            src={photo}
            className={`h-[21rem] object-cover`}
          />
        </div>
        <Name name={name} company={company}></Name>
        <Period start_at={join_date} end_at={leave_date}></Period>
        <Description description={description}></Description>
      </div>
    </div>
  )
}

export default CardMember
