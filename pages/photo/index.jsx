import { contentfulClientApi } from '@/utils/contentfu-api'
import { Gallery } from 'react-grid-gallery'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/plugins/captions.css'

function Photo({ images }) {
  const [index, setIndex] = useState(-1)

  const handleClick = (index, item) => setIndex(index)

  return (
    <div>
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
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
//Server Side에서 API 요청을 위한 함수
export async function getServerSideProps(context) {
  const { req, res } = context
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'photos',
    order: 'sys.createdAt',
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

  return {
    props: {
      images: entries.items.map((v) => {
        return {
          src: v.fields.photo,
          width: 300,
          height: 300,
          caption: v.fields.description,
        }
      }),
    }, // will be passed to the page component as props
  }
}
