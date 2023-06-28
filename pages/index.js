import Typography from '@/components/common/Typography'
import { contentfulClientApi } from '@/utils/contentfu-api'
import { useState, useEffect } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import Link from 'next/link'
import PageTemplate1 from '@/components/home/PageTemplate1'
import PageTemplate2 from '@/components/home/PageTemplate2'
import SlideTypography from '@/components/common/SlideTypography'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", width: "100px", height: "100px", position: 'absolute', right: -90, top: '50%', transform: 'translateY(-50%)' }}
     onClick={onClick}
    >
      <img src="/images/slideR.png" />
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  width: "100px", height: "100px", position: 'absolute', left: -90, top: '50%', transform: 'translateY(-50%)' }}
      onClick={onClick}
    >
      <img src="/images/slideL.png" />
    </div>
  );
}


export default function Home() {
  const [projects, setProjects] = useState([])

  const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };

  useEffect(() => {
    const fetchProjects = async () => {
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
      setProjects(entries.items)
      console.log("entries.items", entries.items);
    }
    fetchProjects()
  }, [])

  return (
    <>
      <PageTemplate1 bg={'/images/newintroduce1.png'}>
        <div className="text-container flex-start ml-48 mb-18">
          <div>
            <Typography type={`h3`}>세상을 바꾸는 또라이가 되자</Typography>
          </div>
          <div className={`flex justify-start mt-14`}>
            <Typography type={'body2'} className={`text-start`}>
              Computers are incredibly fast, accurate, and stupid.
              <br />
              Human beings are incredibly slow, inaccurate, and brilliant.
              <br />
              Together they are powerful beyond imagination.
            </Typography>
          </div>
          <div className='mt-8'>
            <Typography type={'body2'} className={`text-start`}>
              <div />- Albert Einstein -
            </Typography>
          </div>
        </div>
      </PageTemplate1>
      <PageTemplate2 bg={'/images/newintroduce2.png'}>
        <div className="text-container mb-8">
          <div>
            <Typography type={`h3`}>
              프로그래밍으로 세상을 바꿔갑니다
            </Typography>
          </div>
          <div className={`flex justify-end mt-14 mr-48`}>
            <Typography type={'body1'} className={`text-end`}>
              다양한 분야의 개발자들이 모여 세상을 바꿀 서비스를 만들어갑니다.
              <br />
              어떤일을 하는지 경력이 얼마인지 중요하지 않습니다.
              <br />
              프로그래밍에대한 열정으로 같이 발전해나갈 사람들이 모였습니다.
              <br />
            </Typography>
          </div>
        </div>
      </PageTemplate2>
      <div style={{ background: '#141416' }}>
        <div className='pt-10 px-44'>
          <SlideTypography type={'h1'}>Our Projects</SlideTypography>
        </div>
        <div className='pt-6 px-44 '>
          <div className='mb-4 ' style={{ height: '1px', background: '#B4B4B4', border: 'none', position: 're' }}></div>
          <Slider {...settings}>
            {projects.map((v) => (
              <div key={v.fields.name} className={`border border-transparent flex`}>
                <div className='flex justify-start'>
                  <SlideTypography type={'h4'} className="pt-4 pl-24 pb-24">{v.fields.name}</SlideTypography>
                </div>
                <div className='mx-auto flex w-10/12 overflow-visible'>
                  <div className='w-1/2 flex flex-col mr-16'>
                    <div className='flex'>
                      <div className='w-2/5 mr-4'>
                        <SlideTypography type='body2'>Description</SlideTypography>
                      </div>
                      <div className='w-3/4'>
                        <SlideTypography type='body1'>{v.fields.description.content[0].content[0].value}</SlideTypography>
                      </div>
                    </div>
                    <div className='w-full flex mt-6'>
                      <div className='my-4 w-full' style={{ height: '1px', background: '#B4B4B4', border: 'none' }}></div>
                    </div>
                    <div className='flex mt-6'>
                      <div className='w-2/5 mr-4'>
                        <SlideTypography type='body2'>Tech Stacks</SlideTypography>
                      </div>
                      <div className='w-3/4'>
                        <SlideTypography type='body1'>{v.fields.tech_stacks.join(", ")}</SlideTypography>
                      </div>
                    </div>
                    <div className='flex mt-6'>
                      <div className='w-2/5 mr-4'>
                        <SlideTypography type='body2'>Duration</SlideTypography>
                      </div>
                      <div className='w-3/4'>
                        <SlideTypography type='body1'>{v.fields.start_at} ~ {v.fields.end_at}</SlideTypography>
                      </div>
                    </div>
                    <div className='w-full flex mt-6'>
                      <div className='my-4 w-full' style={{ height: '1px', background: '#B4B4B4', border: 'none' }}></div>
                    </div>
                    <div className='flex mt-6'>
                      <div className='w-2/5 mr-4'>
                        <SlideTypography type='body2'>Awards</SlideTypography>
                      </div>
                      <div className='w-3/4'>
                        <SlideTypography type='body1'>{v.fields.prizes.value}</SlideTypography>
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 justify-center'>
                    <div className={`w-[500px] h-[500px] flex justify-center`}>
                      <img
                        src={v.fields.photos[0]}
                        alt=""
                        className={`bg-contain h-full`}
                        width={564}
                        height={504}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="pb-24"></div>
      </div>
    </>
  )
}
