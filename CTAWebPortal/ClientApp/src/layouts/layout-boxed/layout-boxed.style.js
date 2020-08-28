const styles = theme => ({
  wrapper: {
    color: theme.overrides.MuiAppBar.colorDefault.color,
    backgroundColor: theme.overrides.MuiAppBar.colorDefault.backgroundColor
  },
  main: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
  }
});

export default styles;
