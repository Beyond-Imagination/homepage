function Prize({ prizes }) {
  return (
    <div className={`flex items-center mb-4`}>
      <span className="material-icons material-symbols-outlined">
        military_tech
      </span>
      <span>{prizes.value}</span>
    </div>
  )
}

export default Prize
