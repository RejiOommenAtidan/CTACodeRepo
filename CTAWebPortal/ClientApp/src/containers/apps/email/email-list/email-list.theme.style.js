const categoryListWidth = 100;
const menuWidth = 256;

const styles = theme => ({
  mobileMenuPaper: {
    height: '100%',
    position: 'absolute',
    left: categoryListWidth,
    width: menuWidth,
    maxWidth: menuWidth
  },
  desktopMenuPaper: {
    position: 'relative',
    height: '100%',
    width: menuWidth,
    maxWidth: menuWidth
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
    background: theme.palette.primary.light
  },
  'portal-thread-list__item__text--active': {
    color: theme.palette.primary.contrastText
  },
  // Thread container

  // Fab button icon
  'portal-email-compose-fab__icon': {
    color: theme.palette.secondary.contrastText
  }
});

export default styles;
