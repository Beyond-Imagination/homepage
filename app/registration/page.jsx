import RegistrationForm from '@/components/registration/RegistrationForm'

function RegistrationPage() {
  return (
    <div className={`h-full mt-16 pb-24`}>
      <div className={`flex justify-center`}>
        <h1 className={`text-4xl font-bold my-12`}>{`Registration`}</h1>
      </div>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage
