import bg from '@/assets/images/introduce1.png'
import Image from 'next/image'

function PageTemplate({ children, style, bg }) {
  return (
    <div
      className={`flex items-center justify-center h-[860px] relative`}
      style={{ ...style, background: bg }}
    >
      <div className={`absolute z-10`}>{children}</div>

      {bg && (
        <Image
          src={bg}
          alt="메인 배경 이미지"
          width={1440}
          height={860}
        ></Image>
      )}
    </div>
  )
}

export default PageTemplate
