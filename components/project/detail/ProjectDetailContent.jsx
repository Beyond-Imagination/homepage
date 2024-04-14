export const ProjectDetailContent = (props) => {
  return (
    <div className={`mb-5 flex items-center`}>
      <h2 className={`text-base font-bold text-gray-300 w-2/5`}>
        {props.title}
      </h2>
      <div className={`text-sm w-3/5`}>{props.content}</div>
    </div>
  )
}
