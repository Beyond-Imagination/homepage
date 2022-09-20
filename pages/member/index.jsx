import { contentfulClientApi } from '@/utils/contentfu-api'
import CardList from '@/components/member/CardList.member'

function Member(props) {
  const { members } = props
  return (
    <div className={`h-full`}>
      <CardList title="팀원 소개" members={members.remain_member}></CardList>
      <CardList title="탈퇴 멤버" members={members.left_member}></CardList>
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
      members: await getEntities(),
    }, // will be passed to the page component as props
  }
}

async function getEntities() {
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'member',
    order: 'fields.join_date',
  })
  const remain_member = []
  const left_member = []

  const map = new Map()
  entries.includes.Asset.forEach((asset) => {
    const key = asset.sys.id
    const value = `https:${asset.fields.file.url}`
    map.set(key, value)
  })

  entries.items.forEach((item) => {
    if (item.fields.photo !== undefined) {
      item.fields.photo = map.get(item.fields.photo.sys.id)
    }
    if (item.fields.left) {
      left_member.push(item)
    } else if (item.fields.captain) {
      remain_member.unshift(item)
    } else {
      remain_member.push(item)
    }
  })
  return { remain_member: remain_member, left_member: left_member }
}
