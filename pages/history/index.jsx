import { contentfulClientApi } from '@/utils/contentfu-api'
import styles from '../../styles/history.module.css'
import HistoryItem from '@/components/history/HistoryItem'

function History(props) {
  const { histories } = props
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

export async function getServerSideProps(context) {
  const { res } = context
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const entries = await contentfulClientApi.getEntries({
    order: '-fields.date',
    select: 'fields',
    content_type: 'history',
  })

  return {
    props: {
      histories: entries.items,
    }, // will be passed to the page component as props
  }
}
