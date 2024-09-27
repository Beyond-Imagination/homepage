interface MemberProps {
  members?: string[]
}

const Member: React.FC<MemberProps> = ({ members = [] }) => {
  const sortedMembers = [...members].sort()
  return <div className="mb-4">{sortedMembers.join(', ')}</div>
}
