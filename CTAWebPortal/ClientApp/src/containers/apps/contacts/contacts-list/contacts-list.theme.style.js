const styles = theme => ({
  list: {
    flexShrink: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    overflowY: 'auto',
    flexDirection: 'column',
    boxShadow: '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)'
  },
  searchContainer: {
    'box-shadow': `0 2px 4px rgba(0,0,0,.075)`,
    padding: 16
  },
  listWrapper: {
    overflowY: 'auto',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column'
  },
  portalContactsListItemIconActive: {
    color: theme.palette.secondary.main
  },
  portalContactsListItemIcon: {
    marginRight: 0
  },
  // Contacts List container
  'portal-contacts-list__item--active': {
    background: theme.palette.primary.light
  },
  'portal-contacts-list__item__text--active': {
    color: theme.palette.primary.contrastText
  }
});

export default styles;
