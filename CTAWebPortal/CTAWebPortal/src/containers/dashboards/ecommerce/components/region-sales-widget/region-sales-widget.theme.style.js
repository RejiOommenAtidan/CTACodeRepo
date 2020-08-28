const styles = theme => ({
  'portal-sales-widget': {
    padding: 0,
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& >:last-child': {
      paddingBottom: 0
    }
  },
  'portal-sales-widget__map': {
    height: '100%',
    minHeight: 300,
    position: 'relative',
    padding: 0
  }
});

export default styles;
