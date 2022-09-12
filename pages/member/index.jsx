import { contentfulClientApi } from '@/utils/contentfu-api'
import CardList from '@/components/member/CardList.member'

function Member(props) {
  console.log(props)
  const { members, left_members } = props
  return (
    <div className={`h-full`}>
      <div className={`flex justify-center`}>
        <h1 className={`text-4xl font-bold my-12`}>팀원 소개</h1>
      </div>
      <CardList members={members}></CardList>
      <div className={`flex justify-center`}>
        <h1 className={`text-4xl font-bold my-12`}>탈퇴 멤버</h1>
      </div>
      <CardList members={left_members}></CardList>
    </div>
  )
}

export default Member

export async function getServerSideProps(context) {
  const { res } = context
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {
      members: await getEntities('member'),
      left_members: await getEntities('left_member'),
    }, // will be passed to the page component as props
  }
}

async function getEntities(content_type) {
  const members = []
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: content_type,
    order: 'fields.join_date',
  })

  const map = new Map()
  entries.includes.Asset.forEach((asset) => {
    const key = asset.sys.id
    const value = `https:${asset.fields.file.url}`
    map.set(key, value)
  })

  entries.items.forEach((item) => {
    console.log(item)
    if (item.fields.photo !== undefined) {
      item.fields.photo = map.get(item.fields.photo.sys.id)
    }
    if (item.fields.captain) {
      members.unshift(item)
    } else {
      members.push(item)
    }
  })
  return members
}
