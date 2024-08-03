'use client'
import Typography from '@/components/common/Typography'
import PageTemplate1 from '@/components/home/PageTemplate1'
import PageTemplate2 from '@/components/home/PageTemplate2'
import SlideTypography from '@/components/common/SlideTypography'
import { fetchProjects, Project } from '@/lib/api'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CustomNextArrow from '@/components/home/CustomNextArrow'
import CustomPrevArrow from '@/components/home/CustomPrevArrow'
import { Entry } from 'contentful'

export default function Home() {
  const [projects, setProjects] = useState<Entry<Project>[]>([])
  useEffect(() => {
    fetchProjects().then((data) => {
      console.log(data)
      setProjects(data)
    })
  }, [])
  const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  }

  return (
    <>
      <PageTemplate1 bg={'/images/newintroduce1.png'}>
        <div className="text-container flex-start mx-4 md:ml-48 md:mb-18 text-white">
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
          <div className="mt-8">
            <Typography type={'body2'} className={`text-start`}>
              <div />- Albert Einstein -
            </Typography>
          </div>
        </div>
      </PageTemplate1>
      <PageTemplate2 bg={'/images/newintroduce2.png'}>
        <div className="text-container mx-4 md:mr-48 text-white">
          <div>
            <Typography type={`h3`}>
              프로그래밍으로 세상을 바꿔갑니다
            </Typography>
          </div>
          <div className={`flex justify-end mt-14`}>
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
      <div
        className={`md:px-44 hidden md:block`}
        style={{ background: '#141416' }}
      >
        <div className="pt-10 ">
          <SlideTypography type={'h1'}>Our Projects</SlideTypography>
        </div>
        <div className="pt-6">
          <div
            className="mb-4 "
            style={{
              height: '1px',
              background: '#B4B4B4',
              border: 'none',
              position: 'relative',
            }}
          ></div>
          <Slider {...settings}>
            {projects.map((project) => {
              let descriptionValue = ''
              if (
                project.fields.description &&
                project.fields.description.content[0] &&
                project.fields.description.content[0].content &&
                project.fields.description.content[0].content[0]
              ) {
                descriptionValue =
                  project.fields.description.content[0].content[0].value ?? ''
              }

              return (
                <div
                  key={project.fields.name}
                  className={`border border-transparent flex text-white`}
                >
                  <div className="flex justify-start">
                    <SlideTypography type={'h4'} className="pt-4 pl-24 pb-24">
                      {project.fields.name}
                    </SlideTypography>
                  </div>
                  <div className="mx-auto flex w-10/12 overflow-visible">
                    <div className="w-1/2 flex flex-col mr-16">
                      <div className="flex">
                        <div className="w-2/5 mr-4">
                          <SlideTypography type="body2">
                            Description
                          </SlideTypography>
                        </div>
                        <div className="w-3/4">
                          <SlideTypography type="body1">
                            {descriptionValue}
                          </SlideTypography>
                        </div>
                      </div>
                      <div className="w-full flex mt-6">
                        <div
                          className="my-4 w-full"
                          style={{
                            height: '1px',
                            background: '#B4B4B4',
                            border: 'none',
                          }}
                        ></div>
                      </div>
                      <div className="flex mt-6">
                        <div className="w-2/5 mr-4">
                          <SlideTypography type="body2">
                            Tech Stacks
                          </SlideTypography>
                        </div>
                        <div className="w-3/4">
                          <SlideTypography type="body1">
                            {project.fields.tech_stacks.join(', ')}
                          </SlideTypography>
                        </div>
                      </div>
                      <div className="flex mt-6">
                        <div className="w-2/5 mr-4">
                          <SlideTypography type="body2">
                            Duration
                          </SlideTypography>
                        </div>
                        <div className="w-3/4">
                          <SlideTypography type="body1">
                            {project.fields.start_at} ~ {project.fields.end_at}
                          </SlideTypography>
                        </div>
                      </div>
                      <div className="w-full flex mt-6">
                        <div
                          className="my-4 w-full"
                          style={{
                            height: '1px',
                            background: '#B4B4B4',
                            border: 'none',
                          }}
                        ></div>
                      </div>
                      <div className="flex mt-6">
                        <div className="w-2/5 mr-4">
                          <SlideTypography type="body2">Awards</SlideTypography>
                        </div>
                        <div className="w-3/4">
                          <SlideTypography type="body1">
                            {getValues(project.fields.prizes) || 'X'}
                          </SlideTypography>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 justify-center">
                      <div
                        className={`w-[500px] h-[500px] flex justify-center`}
                      >
                        <Image
                          src={project.fields.photos[0]}
                          alt=""
                          className={`bg-contain h-full`}
                          width={564}
                          height={504}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
        <div className="pb-24"></div>
      </div>
    </>
  )
}

function getValues(prizes: any): string {
  console.log(prizes)
  if (Array.isArray(prizes)) {
    return prizes.map((prize) => prize.value || prize.prize).join(', ')
  } else {
    return prizes.value
  }
}
