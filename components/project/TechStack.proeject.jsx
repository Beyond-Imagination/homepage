function TechStack({ tech_stacks }) {
  return (
    <div className={`flex flex-wrap mb-2`}>
      {tech_stacks.sort().map((tech_stack, index) => {
        return (
          <div
            key={index}
            className={`px-2 py-0.5 mb-2 mr-2 border border-gray-400 rounded`}
          >
            {tech_stack}
          </div>
        )
      })}
    </div>
  )
}
export default TechStack
