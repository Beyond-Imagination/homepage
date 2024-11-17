import styles from '../../styles/history.module.css'
import ScrollEvent from '@/components/history/ScrollEvent'
import { useRef } from 'react'

interface HistoryItemProps {
  data: {
    fields: {
      date: string
      text: string
    }
  }
}

export default function HistoryItem({ data }: HistoryItemProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  ScrollEvent(scrollRef)

  return (
    <div className={`${styles.historyItem}`} ref={scrollRef}>
      <div className={`${styles.historyItemContent}`}>
        <time>{data.fields.date}</time>
        <p className={`text-3xl font-bold my-4`}>{data.fields.text}</p>
        <span className={`${styles.circle}`} />
      </div>
    </div>
  )
}
