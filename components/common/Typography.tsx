interface TypographyProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2'
  children: React.ReactNode
  color?: string
  className?: string
}

const styles = {
  body1: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
    fontWeight: 500, //Regular
    fontSize: '1.125rem',
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
    fontWeight: 100, //Regular
    fontSize: '1.125rem',
    letterSpacing: 0.25,
  },
  h1: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
    fontWeight: 300,
    fontSize: '6rem',
    letterSpacing: -1.5,
  },
  h2: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
    fontWeight: 300, //Light
    fontSize: '3.75rem',
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
    fontWeight: 600, //Regular
    fontSize: '2.25rem',
    letterSpacing: 0,
  },
  h4: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
    fontWeight: 400, //Regular
    fontSize: '2.125rem',
    letterSpacing: 0.25,
  },
}

function Typography({ type, children, color, className }: TypographyProps) {
  switch (type) {
    case 'h1':
      return (
        <h1 color={color} className={className} style={styles.h1}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 color={color} className={className} style={styles.h2}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 color={color} className={className} style={styles.h3}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 color={color} className={className} style={styles.h4}>
          {children}
        </h4>
      )
    case 'body1':
      return (
        <span color={color} className={className} style={styles.body1}>
          {children}
        </span>
      )
    case 'body2':
      return (
        <span color={color} className={className} style={styles.body2}>
          {children}
        </span>
      )
    default:
      return <span color={color}>{children}</span>
  }
}

export default Typography
