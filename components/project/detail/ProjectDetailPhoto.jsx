const ProjectDetailPhoto = ({ project, photoNum, selectPhotoNum }) => {
  return (
    <div id="default-carousel" className="relative">
      <div className="relative h-[720px] overflow-hidden rounded-lg">
        {project.photos.map((value, index) => {
          return (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                index === photoNum ? '' : 'hidden'
              }`}
            >
              <img
                src={value}
                className="absolute block h-[720px] object-fill -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          )
        })}
      </div>

      <div className="absolute z-50 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {project.photos.map((value, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === photoNum ? 'bg-amber-50' : 'bg-[#353F4D]'
              }`}
              onClick={() => {
                selectPhotoNum(index)
              }}
            ></button>
          )
        })}
      </div>
      <button
        type="button"
        style={{ left: '10%' }}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          selectPhotoNum(Math.max(photoNum - 1, 0))
        }}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-400/30 group-hover:bg-white/50 dark:group-hover:bg-gray-400/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        style={{ right: '10%' }}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          selectPhotoNum(Math.min(photoNum + 1, project.photos.length - 1))
        }}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-400/30 group-hover:bg-white/50 dark:group-hover:bg-gray-400/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}

export default ProjectDetailPhoto
