
function PageTemplate1({ children, style, bg }) {
  return (
    <div
      className={`flex items-center justify-start relative `}
      style={{ ...style, background: bg }}
    >
      <div className={`absolute z-10`}>{children}</div>

      {bg && (
        <img src={bg} alt="메인 배경 이미지" width={1920} height={963}></img>
      )}
    </div>
  )
}

export default PageTemplate1
