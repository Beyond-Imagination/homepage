const styles = {
  body1: {
    fontWeight: 400, //Regular
    fontSize: 16,
    letterSpacing: 0.5,
  },
  body2: {
    fontWeight: 400, //Regular
    fontSize: 14,
    letterSpacing: 0.25,
  },
  h1: {
    fontWeight: 300,
    fontSize: 96,
    letterSpacing: -1.5,
  },
  h2: {
    fontWeight: 300, //Light
    fontSize: 60,
    letterSpacing: -0.5,
  },
  h3: {
    fontWeight: 400, //Regular
    fontSize: 48,
    letterSpacing: 0,
  },
  h4: {
    fontWeight: 400, //Regular
    fontSize: 34,
    letterSpacing: 0.25,
  },
}

function Typography({ type, children, color, className }) {
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
