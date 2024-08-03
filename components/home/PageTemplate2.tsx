interface PageTemplate1Props {
  children: React.ReactNode
  style?: React.CSSProperties
  bg?: string
}
function PageTemplate2({ children, style, bg }: PageTemplate1Props) {
  return (
    <div
      className={`flex items-center justify-end h-[calc(100vh-64px)]`}
      style={{ ...style, backgroundImage: `url(${bg})` }}
    >
      <div className={``}>{children}</div>
    </div>
  )
}

export default PageTemplate2
