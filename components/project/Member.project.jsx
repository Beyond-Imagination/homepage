function Member({ members }) {
  return <div className={`mb-4`}>{members.sort().join(', ')}</div>
}

export default Member
