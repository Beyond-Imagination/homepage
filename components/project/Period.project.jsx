function Period({ start_at, end_at }) {
  return <div>{`${start_at}${end_at ? ' ~ ' + end_at : ''}`}</div>
}

export default Period
