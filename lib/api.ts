import { contentfulClientApi } from '@/utils/contentfu-api'
import { Entry, EntryFields } from 'contentful'
import RichText = EntryFields.RichText

interface Asset {
  sys: {
    id: string
  }
  fields: {
    file: {
      url: string
    }
  }
}

export interface IEntryFields {
  photos: Photo[]
}

interface Photo {
  sys: {
    id: string
  }
}

export interface Project {
  attachments: any[]
  description: RichText
  end_at: string
  github: any[]
  members: string[]
  name: string
  photos: any
  prizes: any
  start_at: string
  tech_stacks: string[]
}
const assetUrlMap = new Map<string, string>()

const mapAssets = (assets: Asset[]) => {
  assets.forEach((asset) => {
    const url = `https:${asset.fields.file.url}`
    assetUrlMap.set(asset.sys.id, url)
  })
}

const resolvePhotos = (photos: any[]) => {
  return photos.map((photo) => assetUrlMap.get(photo.sys.id) || '')
}

export const fetchProjects = async (): Promise<Entry<Project>[]> => {
  const entries = await contentfulClientApi.getEntries<Project>({
    select: 'fields',
    content_type: 'projects',
  })

  if (assetUrlMap.size === 0) {
    mapAssets(entries.includes.Asset as Asset[])
  }

  entries.items.forEach((item) => {
    item.fields.photos = resolvePhotos(item.fields.photos)
  })

  return entries.items
}

export const fetchProjectById = async (id: string) => {
  const entries = await contentfulClientApi.getEntries<Project>({
    select: 'fields',
    content_type: 'projects',
    'sys.id': id,
  })

  if (assetUrlMap.size === 0) {
    mapAssets(entries.includes.Asset as Asset[])
  }

  entries.items.forEach((item) => {
    item.fields.photos = resolvePhotos(item.fields.photos)
  })

  return entries.items[0].fields
}
