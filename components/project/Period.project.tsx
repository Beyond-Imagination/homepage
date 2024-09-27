interface PeriodProps {
  start_at: string
  end_at?: string
}

const Period: React.FC<PeriodProps> = ({ start_at, end_at }) => {
  return <div>{`${start_at}${end_at ? ' ~ ' + end_at : ''}`}</div>
}

export default Period
