const styles = theme => ({
  'portal-annual-performance-widget': {
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
  'portal-annual-performance-widget__chart': {
    width: '100%',
    position: 'relative',
    padding: 0
  }
});

export default styles;
