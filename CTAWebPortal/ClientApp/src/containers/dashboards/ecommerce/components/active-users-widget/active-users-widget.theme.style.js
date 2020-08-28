const styles = theme => ({
  'portal-active-users-widget': {
    padding: 0,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: '100%',
    position: 'relative'
  },
  'portal-active-users-widget__text': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 24,
    boxSizing: 'border-box'
  },
  'portal-trend': {
    display: 'flex',
    alignItems: 'center'
  },
  'portal-trend__icon': {
    padding: '0px 3px',
    fontSize: 12,
    color: '#4caf50'
  },
  'portal-active-users-widget__chart': {
    position: 'relative',
    '& canvas': {
      maxWidth: '100%'
    }
  }
});

export default styles;
