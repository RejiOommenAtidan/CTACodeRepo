const styles = theme => ({
  'portal-user-tasks-widget': {
    padding: 0,
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  'portal-user-tasks-widget-content': {
    height: '100%',
    minHeight: 500,
    position: 'relative',
    overflow: 'auto',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  list: {
    minWidth: '300px'
  },
  listWrapper: {
    position: 'absolute',
    width: '100%',
    padding: 0
  },
  portalUserTasksWidgetItemIconActive: {
    color: theme.palette.secondary.main
  },
  portalUserTasksWidgetItemIcon: {
    marginRight: 0
  },
  // Users List container
  'portal-users-list-item--active': {
    background: theme.palette.primary.light
  },
  'portal-users-list-item__text--active': {
    color: theme.palette.primary.contrastText
  },
  'portal-badge--primary': {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark
  },
  'portal-badge--secondary': {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.light
  }
});

export default styles;
