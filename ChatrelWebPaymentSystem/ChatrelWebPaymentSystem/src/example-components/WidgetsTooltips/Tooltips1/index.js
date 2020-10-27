import React from 'react';

import { Grid, Button, Tooltip } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid item xl={6} md={8} sm={12} className="mx-auto">
        <div className="d-flex align-items-center justify-content-center py-4 flex-wrap">
          <Grid container justify="center">
            <Grid item>
              <Tooltip
                title="Tooltip with top-start position!"
                arrow
                placement="top-start"
                classes={{ tooltip: 'p-3' }}>
                <Button variant="text" className="m-2 btn-outline-primary">
                  Top Start
                </Button>
              </Tooltip>
              <Tooltip title="Tooltip with top position!" arrow placement="top">
                <Button variant="text" className="m-2 btn-outline-primary">
                  Top
                </Button>
              </Tooltip>
              <Tooltip
                title="Tooltip with top-end position!"
                arrow
                placement="top-end"
                classes={{ tooltip: 'p-3' }}>
                <Button variant="text" className="m-2 btn-outline-primary">
                  Top End
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Tooltip
                title="Tooltip with left-start position!"
                arrow
                placement="left-start"
                classes={{ tooltip: 'p-3' }}>
                <Button variant="text" className="m-2 btn-outline-primary">
                  Left Start
                </Button>
              </Tooltip>
              <br />
              <Tooltip
                title="Tooltip with left position!"
                arrow
                placement="left">
                <Button variant="text" className="m-2 btn-outline-primary">
                  Left
                </Button>
              </Tooltip>
              <br />
              <Tooltip
                title="Tooltip with left-end position!"
                arrow
                placement="left-end"
                classes={{ tooltip: 'p-3' }}>
                <Button variant="text" className="m-2 btn-outline-primary">
                  Left End
                </Button>
              </Tooltip>
            </Grid>
            <Grid
              item
              container
              xs={6}
              alignItems="flex-end"
              direction="column">
              <Grid item>
                <Tooltip
                  title="Tooltip with right-start position!"
                  arrow
                  placement="right-start"
                  classes={{ tooltip: 'p-3' }}>
                  <Button variant="text" className="m-2 btn-outline-primary">
                    Right Start
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title="Tooltip with right position!"
                  arrow
                  placement="right">
                  <Button variant="text" className="m-2 btn-outline-primary">
                    Right
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title="Tooltip with right-end position!"
                  arrow
                  placement="right-end"
                  classes={{ tooltip: 'p-3' }}>
                  <Button variant="text" className="m-2 btn-outline-primary">
                    Right End
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Tooltip
                title="Tooltip with bottom-start position!"
                arrow
                placement="bottom-start"
                classes={{ tooltip: 'p-3' }}>
                <Button variant="text" className="m-2 btn-outline-primary">
                  Bottom Start
                </Button>
              </Tooltip>
              <Tooltip
                title="Tooltip with bottom position!"
                arrow
                placement="bottom">
                <Button variant="text" className="m-2 btn-outline-primary">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip
                title="Tooltip with bottom-end position!"
                arrow
                placement="bottom-end"
                classes={{ tooltip: 'p-3' }}>
                <Button variant="text" className="m-2 btn-outline-primary">
                  Bottom End
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}
