'use client'
import { contentfulClientApi } from '@/utils/contentfu-api'
import CardList from '@/components/member/CardList.member'
import useSWR from 'swr'

export default function Member() {
  const { data, error, isLoading } = useSWR('/api/members', getMembers)
  if (error) {
    return <div>failed to load</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div style={{ backgroundColor: '#141416' }}>
      <div className={`h-full mt-16 pb-24`}>
        <CardList title="팀원 소개" members={data.remain_member}></CardList>
        <CardList title="탈퇴 멤버" members={data.left_member}></CardList>
      </div>
    </div>
  )
}

async function getMembers() {
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
