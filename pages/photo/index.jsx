import { contentfulClientApi } from '@/utils/contentfu-api'
import PhotoAlbum from 'react-photo-album'
import { useState, useEffect } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/plugins/captions.css'

function Photo() {
  const [index, setIndex] = useState(-1)
  const [images, setImages] = useState([])

  useEffect(() => {
    async function fetchData() {
      //get Contetntful Data / Content Type: photos
      const entries = await contentfulClientApi.getEntries({
        select: 'fields',
        content_type: 'photos',
        order: '-fields.date',
      })

      const map = new Map()
      entries.includes.Asset.forEach((asset) => {
        const key = asset.sys.id
        const value = `https:${asset.fields.file.url}`
        map.set(key, value)
      })

      entries.items.forEach((item) => {
        item.fields.photo = map.get(item.fields.photo.sys.id)
      })

      //get Contentful Data / Media
      const assets = await contentfulClientApi.getAssets({
        select: 'fields',
      })

      const photos = new Map()
      assets.items.forEach((asset) => {
        const key = `https:${asset.fields.file.url}`
        const value = asset.fields.file.details.image
        photos.set(key, value)
      })

      const images = entries.items.map((v) => {
        return {
          src: v.fields.photo,
          width: photos.get(v.fields.photo).width,
          height: photos.get(v.fields.photo).height,
          caption: v.fields.description,
        }
      })

      setImages(images)
    }

    fetchData()
  }, [])

  return (
    <div>
      <PhotoAlbum
        layout="rows"
        spacing={5}
        photos={images}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={images.map((v) => {
          return { src: v.src, title: v.caption }
        })}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions, Zoom]}
      />
    </div>
  )
}
export default Photo
