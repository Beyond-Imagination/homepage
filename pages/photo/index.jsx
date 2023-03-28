import { contentfulClientApi } from '@/utils/contentfu-api'
import { Gallery } from 'react-grid-gallery'
import { useState, useEffect } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/plugins/captions.css'

function Photo() {
  const [index, setIndex] = useState(-1)
  const handleClick = (index, item) => setIndex(index)

  const [images, setImages] = useState([])

  useEffect(() => {
    async function fetchData() {
      const entries = await contentfulClientApi.getEntries({
        select: 'fields',
        content_type: 'photos',
        order: '-fields.date',
      });

      const map = new Map();
      entries.includes.Asset.forEach((asset) => {
        const key = asset.sys.id;
        const value = `https:${asset.fields.file.url}`;
        map.set(key, value);
      });
      entries.items.forEach((item) => {
        item.fields.photo = map.get(item.fields.photo.sys.id);
      });

      const images = entries.items.map((v) => {
        return {
          src: v.fields.photo,
          width: 300,
          height: 300,
          caption: v.fields.description,
        };
      });

      setImages(images);
    }

    fetchData();
  }, []);

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