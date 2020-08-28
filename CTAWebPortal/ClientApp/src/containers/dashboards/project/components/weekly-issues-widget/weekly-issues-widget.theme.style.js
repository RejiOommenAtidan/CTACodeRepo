const styles = theme => ({
  'portal-line-chart-widget': {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    padding: 0,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: '100%',
    position: 'relative'
  },
  'portal-line-chart-widget__chart': {
    display: 'flex',
    justifyContent: 'flex-end',
    '& canvas': {
      height: 150,
      maxWidth: '100%',
      minHeight: '100%'
    }
  }
});

export default styles;
