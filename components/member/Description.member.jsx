function Description({ description }) {
  return (
    <p
      className={'text-gray-200 text-justify'}
      style={{ whiteSpace: 'pre-line' }}
    >
      {description}
    </p>
  )
}

export default Description
