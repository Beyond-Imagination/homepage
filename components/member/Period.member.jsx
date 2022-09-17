function Period({ start_at, end_at }) {
  return <div>활동일자: {`${start_at}${' ~ ' + (end_at ? end_at : '')}`}</div>
}

export default Period
