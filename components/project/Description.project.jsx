function Description({ description }) {
  return (
    <span
      className={`overflow-ellipsis mb-4 overflow-hidden whitespace-nowrap`}
      title={description.content[0].content[0].value}
    >
      {description.content[0].content[0].value}
    </span>
  )
}

export default Description
