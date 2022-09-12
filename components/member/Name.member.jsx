function Name({ name, company }) {
  return (
    <div className={`text-2xl font-bold my-4`}>
      {name} ({company})
    </div>
  )
}

export default Name
