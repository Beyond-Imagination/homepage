function Name({ name, onClick }) {
  return (
    <div
      className={`text-3xl font-bold my-4 cursor-pointer hover:underline`}
      onClick={onClick}
    >
      {name}
    </div>
  )
}

export default Name
