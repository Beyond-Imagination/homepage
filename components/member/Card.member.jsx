import Name from '@/components/member/Name.member'
import Description from '@/components/member/Description.member'
import styles from '../../styles/Home.module.css'

function CardMember({ item }) {
  const { captain, photo, name, company, join_date, leave_date, description } =
    item.fields

  return (
    <div className={`${styles.member_wrap}`}>
      <div className={`${styles.member} ${captain ? styles.captain : ''}`}>
        <div className={`flex justify-center mb-4 h-[23rem]`}>
          <img
            alt={`${name} image`}
            src={photo}
            className={`w-full h-full object-cover`}
          />
        </div>

        <Name name={name} company={company}></Name>
        <Description description={description}></Description>
      </div>
    </div>
  )
}

export default CardMember
