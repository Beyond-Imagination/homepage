function Period({ start_at, end_at }) {
  return <div>합류날짜: {`${start_at}${' ~ ' + (end_at ? end_at : '')}`}</div>
}

export default Period
