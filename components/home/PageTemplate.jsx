import bg from '@/assets/images/introduce1.png'

function PageTemplate({ children, style, bg }) {
  return (
    <div
      className={`flex items-center justify-center h-[860px] relative`}
      style={{ ...style, background: bg }}
    >
      <div className={`absolute z-10`}>{children}</div>

      {bg && (
        <img src={bg} alt="메인 배경 이미지" width={1440} height={860}></img>
      )}
    </div>
  )
}

export default PageTemplate
