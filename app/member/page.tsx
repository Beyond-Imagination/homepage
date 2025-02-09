'use client'
import { contentfulClientApi } from '@/utils/contentfu-api'
import CardList from '@/components/member/CardListmember'
import useSWR from 'swr'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

interface Member {
  sys: { id: string }
  fields: {
    captain: boolean
    photo: string
    name: string
    company: string
    join_date?: string
    leave_date?: string
    description: string
    left?: boolean
  }
}

export default function Member() {
  const { data, error, isLoading } = useSWR('/api/members', getMembers)
  if (error) {
    return <div>failed to load</div>
  }
  if (isLoading) {
    return (
      <Box className={`w-full h-dvh flex justify-center items-center`}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <div style={{ backgroundColor: '#141416' }}>
      <div className="h-full mt-12 md:mt-16 pb-24">
        {data ? (
          <>
            <CardList title="Member" members={data.remain_member} />
            <CardList title="Former Member" members={data.left_member} />
          </>
        ) : (
          <p className="text-white text-center">Loading members...</p>
        )}
      </div>
    </div>
  )
}

async function getMembers(): Promise<{
  remain_member: Member[]
  left_member: Member[]
}> {
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'member',
    order: 'fields.join_date',
  })
  const remain_member: Member[] = []
  const left_member: Member[] = []

  const map = new Map<string, string>()
  entries.includes.Asset.forEach((asset: any) => {
    const key = asset.sys.id
    const value = `https:${asset.fields.file.url}`
    map.set(key, value)
  })

  entries.items.forEach((item: any) => {
    if (item.fields.photo !== undefined) {
      item.fields.photo = map.get(item.fields.photo.sys.id) || ''
    }
    if (item.fields.left) {
      left_member.push(item)
    } else if (item.fields.captain) {
      remain_member.unshift(item)
    } else {
      remain_member.push(item)
    }
  })
  return { remain_member, left_member }
}
