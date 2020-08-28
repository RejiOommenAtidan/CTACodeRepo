const styles = theme => ({
  'portal-gdx-ticket-widget': {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'stretch space-between',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    height: 112
  },
  'ticker-container': {
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 112
  },
  'ticker-content': {
    display: 'flex',
    willChange: 'transform'
  },
  'ticker-strip': {
    display: 'flex'
  },
  'ticker-item': {
    margin: '0px 16px',
    minWidth: 96,
    height: 112,
    padding: 24,
    borderLeft: '1px solid rgba(0, 0, 0, 0.075)',
    '& img': {
      width: 24,
      height: 24
    },
    '& h2': {
      margin: 0,
      padding: '0 8px',
      fontSize: 16
    },
    '& h4': {
      margin: '8px 0 0 0',
      fontSize: 27,
      '&::first-letter': {
        fontSize: 16,
        display: 'inline-block',
        paddingRight: '.2em',
        opacity: 0.5
      }
    }
  },
  'ticker-item__name': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;
