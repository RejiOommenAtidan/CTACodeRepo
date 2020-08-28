const styles = theme => ({
  'portal-project-stepper__progress': {
    position: 'absolute',
    width: '100%',
    height: 4,
    left: 0,
    top: 44,
    backgroundColor: theme.palette.primary.light
  },
  'portal-project-stepper__progress-bar--background': {
    background: theme.palette.secondary.main,
    '&:after': {
      background: theme.palette.secondary.main
    }
  }
});

export default styles;
