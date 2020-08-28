const styles = theme => ({
  'portal-maps-contact-item--active': {
    color: theme.palette.secondary.light
  },
  'portal-maps-contact-detail-card': {
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText
  },
  'portal-maps-contact-detail-card__pin': {
    background: theme.palette.secondary.contrastText,
    '&:after': {
      background: theme.palette.secondary.main
    }
  },
  'portal-maps-contact-detail-card__pulse': {
    background: theme.palette.secondary.main,
    '&:after': {
      boxShadow: `0 0 1px 2px ${theme.palette.secondary.main}`
    }
  }
});

export default styles;
