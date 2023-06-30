function PageTemplate2({ children, style, bg }) {
  return (
    <div
      className={`flex items-center justify-end relative`}
      style={{ ...style }}
    >
      {bg && (
        <div
          className="relative"
          style={{
            backgroundImage: `linear-gradient(121.39deg, rgba(20, 20, 22, 0.65) 56.85%, rgba(48, 56, 255, 0.65) 144.28%), url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '1920px',
            height: '966px',
          }}
        />
      )}

      <div className={`absolute z-10`}>{children}</div>
    </div>
  )
}

export default PageTemplate2
