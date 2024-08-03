interface PageTemplate1Props {
  children: React.ReactNode
  style?: React.CSSProperties
  bg?: string
}

function PageTemplate1({ children, style, bg }: PageTemplate1Props) {
  return (
    <div
      className={`flex items-center justify-start w-full h-[calc(100vh-64px)]`}
      style={{ ...style, backgroundImage: `url(${bg})` }}
    >
      <div className={`flex w-full`}>{children}</div>
    </div>
  )
}

export default PageTemplate1
