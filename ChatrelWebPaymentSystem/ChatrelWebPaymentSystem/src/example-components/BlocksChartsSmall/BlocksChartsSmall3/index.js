import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box">
            <div className="card-content-overlay text-center py-4">
              <div className="d-70 rounded-circle bg-danger text-white btn-icon mx-auto text-center shadow-danger">
                <FontAwesomeIcon icon={['far', 'bell']} className="display-4" />
              </div>
              <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                $4,745
              </div>
              <div className="font-size-lg opacity-8">Today's Sales</div>
              <div className="divider mx-4 my-4" />
              <div className="text-center">
                <Button size="small" className="px-4 btn-neutral-danger">
                  View details
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box">
            <div className="card-content-overlay text-center py-4">
              <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="display-4"
                />
              </div>
              <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                $
                <CountUp
                  start={0}
                  end={8.348}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={3}
                  decimal=","
                />
              </div>
              <div className="font-size-lg opacity-8">Monthly Income</div>
              <div className="divider mx-4 my-4" />
              <div className="text-center">
                <Button size="small" className="px-4 btn-neutral-primary">
                  View details
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box">
            <div className="card-content-overlay text-center py-4">
              <div className="d-70 rounded-circle bg-info text-white btn-icon mx-auto text-center shadow-info">
                <FontAwesomeIcon icon={['far', 'user']} className="display-4" />
              </div>
              <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                <CountUp
                  start={0}
                  end={582}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={2}
                  decimal=","
                />
              </div>
              <div className="font-size-lg opacity-8">Total Sales</div>
              <div className="divider mx-4 my-4" />
              <div className="text-center">
                <Button size="small" className="px-4 btn-neutral-info">
                  View details
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
