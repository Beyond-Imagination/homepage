import { contentfulClientApi } from '@/utils/contentfu-api'
import styles from '../../styles/history.module.css'
import HistoryItem from '@/components/history/HistoryItem'
import { useState, useEffect } from 'react'

function History() {
  const [histories, setHistories] = useState([])

  useEffect(() => {
    async function fetchData() {
      const entries = await contentfulClientApi.getEntries({
        order: '-fields.date',
        select: 'fields',
        content_type: 'history',
      })
      setHistories(entries.items)
    }
    fetchData()
  }, [])

  return (
    <div className={`h-full`}>
      <div className={`${styles.historyContainer}`}>
        {histories.map((history) => (
          <HistoryItem data={history} key={history.sys.id} />
        ))}
      </div>
    </div>
  )
}

export default History
