import styles from '../../styles/history.module.css'
import { useEffect, RefObject, useCallback } from 'react'

export default function ScrollEvent(scrollRef: RefObject<HTMLElement>) {
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      if (
        window.innerHeight > scrollRef.current.getBoundingClientRect().bottom
      ) {
        scrollRef.current.classList.add(styles.show)
      } else if (scrollRef.current.classList.contains(styles.show)) {
        scrollRef.current.classList.remove(styles.show)
      }
    }
  }, [scrollRef])

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('resize', handleScroll)
      window.addEventListener('scroll', handleScroll)
    }, 100)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, scrollRef])
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) handleScroll()
    }, 100)

    return () => clearTimeout(timer)
  }, [handleScroll, scrollRef])
}
