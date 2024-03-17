import { contentfulClientApi } from '@/utils/contentfu-api'

export const fetchProjects = async () => {
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'projects',
  })
  const map = new Map()
  entries.includes.Asset.forEach((asset) => {
    const key = asset.sys.id
    const value = `https:${asset.fields.file.url}`
    map.set(key, value)
  })
  entries.items.forEach((item) => {
    let photos = []
    item.fields.photos.forEach((photo) => {
      photos.push(map.get(photo.sys.id))
    })
    item.fields.photos = photos
  })
  return entries.items
}
