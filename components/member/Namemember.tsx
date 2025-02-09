interface NameProps {
  name: string
  company: string
}

const Name: React.FC<NameProps> = ({ name, company }) => {
  return (
    <div className="text-2xl font-bold text-gray-200 text-justify mt-4 mb-6">
      {name} ({company})
    </div>
  )
}

export default Name
