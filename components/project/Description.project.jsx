function Description({ description }) {
  return (
    <span
      className={`overflow-ellipsis mb-4 overflow-hidden w-full text-gray-500 text-sm text-m leading-6`}
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
        overflow: 'hidden',
      }}
      title={description.content[0].content[0].value}
    >
      {description.content[0].content[0].value}
    </span>
  )
}

export default Description
