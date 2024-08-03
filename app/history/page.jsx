'use client'
import { contentfulClientApi } from '@/utils/contentfu-api'
import styles from '../../styles/history.module.css'
import HistoryItem from '@/components/history/HistoryItem'
import { useEffect, useState } from 'react'

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
      <div className={`flex justify-center`}>
        <h1
          className={`text-4xl font-bold lg:my-12 my-6 text-gray-300 ${styles.HeaderFont}`}
        >
          History
        </h1>
      </div>
      <div className={`${styles.historyContainer}`}>
        {histories.map((history) => (
          <HistoryItem data={history} key={history.sys.id} />
        ))}
      </div>
    </div>
  )
}

export default History
