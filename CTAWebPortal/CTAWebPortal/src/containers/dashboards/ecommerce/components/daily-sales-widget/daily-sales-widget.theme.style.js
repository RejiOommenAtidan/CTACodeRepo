const styles = theme => ({
  'portal-daily-sales-widget': {
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
  'portal-daily-sales-widget__text': {
    alignSelf: 'center',
    padding: 8,
    width: '30%',
    textAlign: 'center'
  },

  'portal-daily-sales-widget__chart': {
    width: '100%',
    position: 'relative',
    padding: 0
  }
});

export default styles;
