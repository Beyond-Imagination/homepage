import { useEffect, useState } from 'react'
import { contentfulClientApi } from '@/utils/contentfu-api'
import CardList from '@/components/member/CardList.member'

function Member() {
  const [members, setMembers] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getEntities()
      setMembers(data)
    }
    fetchData()
  }, [])

  //contentful api에서 데이터를 가져오지 못했을 때
  if (!members) {
    return <div>Loading...</div>
  }

  return (
    <div className={`h-full`}>
      <CardList title="팀원 소개" members={members.remain_member}></CardList>
      <CardList title="탈퇴 멤버" members={members.left_member}></CardList>
    </div>
  )
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

export default Member
