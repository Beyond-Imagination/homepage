import { EntryFields } from 'contentful'
import RichText = EntryFields.RichText

interface DescriptionProps {
  description: RichText
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const text = description.content
    ? description.content[0]?.content
      ? description.content[0]?.content[0].value
      : ''
    : ''

  return (
    <span
      className="overflow-ellipsis mb-4 overflow-hidden w-full text-gray-500 text-sm text-m leading-6"
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
        overflow: 'hidden',
      }}
      title={text}
    >
      {text}
    </span>
  )
}

export default Description
