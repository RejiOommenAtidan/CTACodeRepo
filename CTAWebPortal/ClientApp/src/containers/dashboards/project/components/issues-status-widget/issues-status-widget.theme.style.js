const styles = theme => ({
  'portal-issues-status-widget': {
    padding: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'stretch space-between',
    height: '100%',
    position: 'relative',
    '& :last-child': {
      paddingBottom: 0
    }
  },
  'portal-issues-status-widget__chart': {
      width: '100%',
      position: 'relative',
      padding: 0,
    '& canvas': {
      height: 350,
      maxWidth: '100%',
      minHeight: '100%'
    }
  }
});

export default styles;
