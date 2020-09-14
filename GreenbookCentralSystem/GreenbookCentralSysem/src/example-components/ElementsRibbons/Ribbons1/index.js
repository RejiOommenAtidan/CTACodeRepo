import React from 'react';

import { Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box text-center pb-4">
        <span className="ribbon-angle ribbon-angle--top-right ribbon-primary">
          <small>Primary</small>
        </span>
        <span className="ribbon-angle ribbon-angle--top-left ribbon-danger">
          <small>Danger</small>
        </span>
        <span className="ribbon-angle ribbon-angle--bottom-right ribbon-success">
          <small>Success</small>
        </span>
        <span className="ribbon-angle ribbon-angle--bottom-left ribbon-warning">
          <small>Warning</small>
        </span>
        <h3 className="font-size-lg font-weight-bold mt-5 mb-4">
          Improve your productivity with one of our UI Design Systems
        </h3>
        <p className="card-text px-5 mb-4">
          With the help of our professional Admin Dashboard Templates and UI
          Kits you'll be able to quickly develop good looking modern
          applications and websites, without the needing a professional
          designer.
        </p>
        <Button
          className="btn-transparent btn-link btn-link-first mb-2 p-0"
          title="Find out more">
          <span>Find out more</span>
        </Button>
      </Card>
    </>
  );
}
