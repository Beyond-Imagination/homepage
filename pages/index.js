import Typography from '@/components/common/Typography'
import PageTemplate from '@/components/home/PageTemplate'
import { contentfulClientApi } from '@/utils/contentfu-api'
import { useState } from 'react'
import Image from 'next/image'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import Link from 'next/link'
export default function Home({ entries }) {
  const [projects, setProjects] = useState(entries.items)
  console.log(projects)
  return (
    <>
      <PageTemplate bg={'/images/introduce1.png'}>
        <div className="text-container">
          <div>
            <Typography type={`h3`}>세상을 바꾸는 또라이가 되자</Typography>
          </div>
          <div className={`flex justify-center`}>
            <Typography type={'body1'} className={`text-center`}>
              Computers are incredibly fast, accurate, and stupid.
              <br />
              Human beings are incredibly slow, inaccurate, and brilliant.
              <br />
              Together they are powerful beyond imagination.
              <br />- Albert Einstein -
            </Typography>
          </div>
        </div>
      </PageTemplate>
      <PageTemplate bg={'/images/introduce2.png'}>
        <div className="text-container">
          <div>
            <Typography type={`h3`}>
              프로그래밍으로 세상을 바꿔갑니다.
            </Typography>
          </div>
          <div className={`flex justify-center`}>
            <Typography type={'body1'} className={`text-center`}>
              다양한 분야의 개발자들이 모여 세상을 바꿀 서비스를 만들어갑니다.
              <br />
              어떤일을 하는지 경력이 얼마인지 중요하지 않습니다.
              <br />
              프로그래밍에대한 열정으로 같이 발전해나갈 사람들이 모였습니다.
              <br />
            </Typography>
          </div>
        </div>
      </PageTemplate>
      <PageTemplate
        className="slide flex flex-col justify-center"
        bg={'/images/introduce3.png'}
      >
        <div className={`flex justify-center mb-8`}>
          <span className={`font-bold text-5xl`}>프로젝트를 소개합니다.</span>
        </div>
        <div className={`flex gap-[72px] justify-center`}>
          {projects.map((v) => (
            <div
              key={v.fields.name}
              className={`border border-transparent p-4`}
            >
              <Link href={'/projects'}>
                <a href={'/projects'}>
                  <div
                    className={`w-[400px] h-[400px] flex justify-center mb-8`}
                  >
                    <Image
                      src={v.fields.photos[0]}
                      alt=""
                      className={`bg-contain h-full`}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className={`w-[400px]`}>
                    <Typography type={'h4'} className={`mb-4`}>
                      {v.fields.name}
                    </Typography>
                    <Typography type={'body2'}>
                      {v.fields.description.content[0].content[0].value}
                    </Typography>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </PageTemplate>
      <PageTemplate>
        <div className={`flex`}>
          <div className={`mr-[140px]`}>
            <Image
              src={'/images/logo.png'}
              alt="로고"
              width={300}
              height={300}
            ></Image>
          </div>
          <div className={`flex flex-col`}>
            <div className={`mb-20`}>
              <div className={`font-bold text-5xl text-center mb-4`}>
                Beyond Imagination
              </div>
              <div className={`text-base text-center`}>
                상상을 뛰어넘는 생각을 실현하기위한 모임입니다.
                <br />
                저희 모임에 합류하실 멋진 크루분들을 항상 기다립니다.
              </div>
            </div>
            <div className={`flex justify-around`}>
              <div className={``}>
                <Link href="https://github.com/Beyond-Imagination">
                  <a
                    href="https://github.com/Beyond-Imagination"
                    className={`flex items-center`}
                  >
                    <GitHubIcon
                      style={{ marginRight: 40, width: 60, height: 60 }}
                    >
                      github-icon
                    </GitHubIcon>
                    <div>github 바로가기</div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="mailto://Beyond.Imagination.Korea@gmail.com">
                  <a
                    href="mailto://Beyond.Imagination.Korea@gmail.com"
                    className={`flex items-center`}
                  >
                    <EmailIcon
                      style={{ marginRight: 40, width: 60, height: 60 }}
                    ></EmailIcon>
                    <div>email로 연락하기</div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    </>
  )
}

//Server Side에서 API 요청을 위한 함수
export async function getServerSideProps(context) {
  const { req, res } = context
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const entries = await contentfulClientApi.getEntries({
    select: 'fields',
    content_type: 'projects',
    limit: 3,
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

  return {
    props: {
      entries: entries,
    }, // will be passed to the page component as props
  }
}
