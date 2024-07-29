function RegistrationForm() {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5 text-center text-black">
          팀 지원 양식
        </h1>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-black font-semibold mb-2"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-black font-semibold mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-black font-semibold mb-2"
            >
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="전화번호를 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="coverLetter"
              className="block text-black font-semibold mb-2"
            >
              자기소개
            </label>
            <textarea
              id="coverLetter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="자기소개를 입력하세요"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            제출하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
