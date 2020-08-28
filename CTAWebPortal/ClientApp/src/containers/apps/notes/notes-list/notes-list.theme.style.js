const desktopMenuWidth = 300;

const styles = theme => ({
  mobileMenuPaper: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  desktopMenuPaper: {
    position: 'relative',
    height: '100%',
    width: desktopMenuWidth,
    maxWidth: desktopMenuWidth,
    zIndex: 'auto'
  },
  fullHeight: {
    height: '100%'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  drawerInner: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%'
  },
  // Email List container
  'portal-thread-list__item--active': {
    background: theme.palette.background.default
  },
  'portal-thread-list__item__icon': {
    fontSize: 16,
    color: theme.palette.secondary.main
  }
});

export default styles;
