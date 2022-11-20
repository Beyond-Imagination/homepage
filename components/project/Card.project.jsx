import Prize from '@/components/project/Prize.project'
import Github from '@/components/project/Github.project'
import TechStack from '@/components/project/TechStack.proeject'
import Member from '@/components/project/Member.project'
import Description from '@/components/project/Description.project'
import Name from '@/components/project/Name.project'
import Period from '@/components/project/Period.project'
import { useRouter } from 'next/router'

function CardProject({ item }) {
  const router = useRouter()
  const {
    attachments,
    description,
    end_at,
    github,
    members,
    name,
    photos,
    prizes,
    start_at,
    tech_stacks,
  } = item.fields
  return (
    <div className={`h-full p-2`}>
      <div className={`flex justify-center mb-4`}>
        <img
          alt={`${name} image`}
          src={photos[0]}
          className={`h-[21rem] object-cover`}
        />
      </div>
      <div className={`flex justify-center flex-col`}>
        {start_at && <Period start_at={start_at} end_at={end_at}></Period>}
        {name && (
          <Name
            name={name}
            onClick={(event) => {
              router.push(`/projects/${item.sys.id}`)
            }}
          ></Name>
        )}
        {description && <Description description={description}></Description>}
        {members && <Member members={members}></Member>}
        {tech_stacks && <TechStack tech_stacks={tech_stacks}></TechStack>}
        {prizes.value && <Prize prizes={prizes}></Prize>}
        {github && <Github github={github}></Github>}
      </div>
    </div>
  )
}

export default CardProject
