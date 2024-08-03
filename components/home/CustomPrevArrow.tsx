interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}
export default function CustomPrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        width: '100px',
        height: '100px',
        position: 'absolute',
        left: -90,
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <img
        src="/images/slideL.png"
        width={100}
        height={100}
        alt={'Left Slide Button'}
      />
    </div>
  )
}
