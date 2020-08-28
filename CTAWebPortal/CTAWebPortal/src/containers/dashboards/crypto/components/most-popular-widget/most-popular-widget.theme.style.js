const styles = theme => ({
  'portal-most-popular-widget': {
    padding: 0,
    boxSizing: 'border-box',
    position: 'relative',
    '& :last-child': {
      paddingBottom: 0
    }
  },
  'portal-most-popular-widget__table': {
    width: '100%',
    position: 'relative',
    padding: 0,
    overflowX: 'auto'
  },
  'table-cell': {
    padding: '4px 14px 4px 14px'
  }
});

export default styles;
