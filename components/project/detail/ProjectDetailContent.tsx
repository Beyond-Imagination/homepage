interface ProjectDetailContentProps {
  title: string
  content: any
}

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({
  title,
  content,
}) => {
  return (
    <div className="mb-5 flex items-center">
      <h2 className="text-base font-bold text-gray-300 w-2/5">{title}</h2>
      <div className="text-sm w-3/5">{content}</div>
    </div>
  )
}
