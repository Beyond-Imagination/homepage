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
    <div
      className={`p-2 `}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #353535',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${photos[0]})`,
          backgroundSize: 'cover',
          height: '14rem',
          width: '100%',
        }}
        alt={`${name} image`}
        className={`flex justify-center mb-3`}
      />

      <div className={`flex flex-col w-full px-4 mb-2 flex-grow`}>
        {name && (
          <Name
            name={name}
            onClick={(event) => {
              router.push(`/projects/${item.sys.id}`)
            }}
          ></Name>
        )}
        {description && <Description description={description}></Description>}
        {/*
        {members && <Member members={members}></Member>}
        {tech_stacks && <TechStack tech_stacks={tech_stacks}></TechStack>}  
        {prizes.value && <Prize prizes={prizes}></Prize>}
        */}
      </div>
      <div className={`px-4`}>
        {github && <Github github={github}></Github>}
      </div>
    </div>
  )
}

export default CardProject
