const styles = theme => ({
  calendar: {
    '& .fc-content': {
      'border-color': theme.palette.primary.main
    },
    '& .fc-event': {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      padding: '10px',
      'border-color': theme.palette.secondary.main
    },
    '& .fc-view': {
      '&:focus': {
        outline: 'none'
      },
      '& > table': {
        background: 'rgba(255, 255, 255, .75)',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0px 20px 30px rgba(0,0,0,0.2)',
        borderColor: 'transparent',
        '& > thead': {
          background: theme.palette.primary.light,
          color: theme.palette.primary.contrastText
        },
        '&:focus': {
          outline: 'none'
        },
        '& th, & td, & hr, & thead, & tbody, & .fc-row, & .fc-popover': {
          borderColor: theme.palette.divider
        },
        '& .fc-content-skeleton': {
          '& th, & td, & hr, & thead, & tbody, & .fc-row, & .fc-popover': {
            borderColor: 'transparent'
          }
        }
      },
      '& .fc-day-header': {
        height: 48,
        verticalAlign: 'middle'
      },
      '& .fc-day-number': {
        padding: 8
      },
      '& .fc-today': {
        background: 'rgba(0, 0, 0, .04) !important'
      },
      '& .fc-content-skeleton .fc-today': {
        background: 'none'
      }
    }
  },
  'portal-calendar-page__view-active': {
    color: theme.palette.secondary.light
  },
  'portal-calendar-page__view-indicator': {
    color: theme.palette.secondary.light
  }
});

export default styles;
