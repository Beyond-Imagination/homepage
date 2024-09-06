'use client'
import { contentfulClientApi } from '@/utils/contentfu-api'
import PhotoAlbum from 'react-photo-album'
import { useEffect, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/captions.css'
import styles from '../../styles/layout.module.css'

interface Image {
  src: string
  width: number
  height: number
  caption: string
  category: string
}
type Category = 'all' | 'meetings' | 'activities' | 'awards'

function Photo() {
  const [index, setIndex] = useState<number>(-1)
  const [images, setImages] = useState<Image[]>([])
  const [category, setCategory] = useState<Category>('all')

  useEffect(() => {
    async function fetchData() {
      try {
        // Get Contentful Data / Content Type: photos
        const entries = await contentfulClientApi.getEntries({
          select: 'fields',
          content_type: 'photos',
          order: '-fields.date',
        })

        const map = new Map<string, string>()
        entries.includes.Asset.forEach((asset: any) => {
          const key = asset.sys.id
          const value = `https:${asset.fields.file.url}`
          map.set(key, value)
        })

        entries.items.forEach((item: any) => {
          item.fields.photo = map.get(item.fields.photo.sys.id)
        })

        // Get Contentful Data / Media
        const assets = await contentfulClientApi.getAssets({
          select: 'fields',
          limit: 1000,
        })

        const photos = new Map<string, { width: number; height: number }>()
        assets.items.forEach((asset: any) => {
          const key = `https:${asset.fields.file.url}`
          const value = asset.fields.file.details.image
          photos.set(key, value)
        })

        const fetchedImages: Image[] = entries.items.map((v: any) => ({
          src: v.fields.photo,
          width: photos.get(v.fields.photo)?.width || 0,
          height: photos.get(v.fields.photo)?.height || 0,
          caption: v.fields.description,
          category: v.fields.category,
        }))

        setImages(fetchedImages)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const filterImagesByCategory = (selectedCategory: Category): Image[] => {
    return selectedCategory === 'all'
      ? images
      : images.filter((image) => image.category === selectedCategory)
  }

  const displayedImages = filterImagesByCategory(category)

  const getButtonClass = (cat: Category): string => {
    const baseClass =
      'flex justify-center items-center w-40 h-14 rounded-lg font-medium text-lg cursor-pointer text-white bg-opacity-10 mx-2 tracking-wide'
    const activeClass = 'bg-white bg-opacity-10'
    const hoverClass = 'hover:bg-white hover:bg-opacity-10'

    return `${baseClass} ${category === cat ? activeClass : hoverClass}`
  }

  return (
    <div className={`h-full`} style={{ backgroundColor: '#141416' }}>
      <div className={`flex justify-center`}>
        <h1
          className={`text-4xl font-bold lg:my-12 my-6 text-gray-300 ${styles.HeaderFont}`}
        >
          Photo
        </h1>
      </div>
      <div className="lg:px-40 md:px-24 px-6 photo-container">
        <div className="pb-10 flex justify-center flex-wrap">
          <button
            className={getButtonClass('all')}
            onClick={() => setCategory('all')}
          >
            전체
          </button>
          <button
            className={getButtonClass('meetings')}
            onClick={() => setCategory('meetings')}
          >
            회의 및 활동
          </button>
          <button
            className={getButtonClass('activities')}
            onClick={() => setCategory('activities')}
          >
            기타 활동
          </button>
          <button
            className={getButtonClass('awards')}
            onClick={() => setCategory('awards')}
          >
            성과 및 수상
          </button>
        </div>

        <div className="photo-gallery pb-24">
          <PhotoAlbum
            layout="rows"
            spacing={5}
            photos={displayedImages}
            onClick={({ index }) => setIndex(index)}
          />

          <Lightbox
            slides={displayedImages.map((v) => ({
              src: v.src,
              title: v.caption,
            }))}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Captions, Zoom]}
          />
        </div>
      </div>
    </div>
  )
}

export default Photo
