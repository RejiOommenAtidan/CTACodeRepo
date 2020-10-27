import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Grid, Card, CardContent, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <CardContent className="p-4">
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <div className="text-center text-lg-left mb-3 mb-lg-0">
              <h1 className="display-4 font-weight-bold">Invoice #INV49583</h1>
              <p className="mb-0 text-black-50">Due on March 12, 2021</p>
            </div>
            <div className="text-center text-lg-left">
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                size="small"
                variant="text"
                className="btn-outline-primary m-1">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'print']} />
                </span>
                <span className="btn-wrapper--label">Print</span>
              </Button>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                size="small"
                variant="text"
                className="btn-outline-primary my-1 mx-2">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'envelope']} />
                </span>
                <span className="btn-wrapper--label">Email</span>
              </Button>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                variant="text"
                className="btn-primary m-1">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'lemon']} />
                </span>
                <span className="btn-wrapper--label">Pay</span>
              </Button>
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex flex-column flex-lg-row justify-content-between mb-5">
            <div>
              <div className="text-uppercase text-primary mb-2 font-size-xs">
                Billed from
              </div>
              <p className="mb-1 font-weight-bold">CompanyName, Inc.</p>
              <p className="text-black-50">
                201 Something St., Something Town, YT 242, Country 6546
              </p>
              <p>
                <span className="d-block pb-1">
                  <b className="pr-2">Tel.:</b>
                  609-876-0996
                </span>
                <span className="d-block">
                  <b className="pr-2">Email:</b>
                  name@company.com
                </span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-uppercase text-primary mb-2 font-size-xs">
                Invoice no.
              </div>
              <h1 className="display-4 opacity-8 text-black-50">#INV49583</h1>
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <div>
              <div className="text-uppercase text-primary mb-2 font-size-xs">
                Billed to
              </div>
              <p className="mb-1 font-weight-bold">Maria P Quinn</p>
              <p className="text-black-50">
                182 Prospect Street, Camden, New Jersey
              </p>
              <p>
                <span className="d-block pb-1">
                  <b className="pr-2">Tel.:</b>
                  856-718-9505
                </span>
                <span className="d-block">
                  <b className="pr-2">Email:</b>
                  rlvs4eizeeo@tstspun.com
                </span>
              </p>
            </div>
            <div>
              <div className="text-uppercase text-primary mb-2 font-size-xs">
                Invoice information
              </div>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between pb-1">
                  <span className="text-black-50 pr-4">Invoice Number</span>
                  <span className="pl-4">INV49583</span>
                </li>
                <li className="d-flex justify-content-between pb-1">
                  <span className="text-black-50 pr-4">Product ID</span>
                  <span className="pl-4">32456</span>
                </li>
                <li className="d-flex justify-content-between pb-1">
                  <span className="text-black-50 pr-4">Issue Date</span>
                  <span className="pl-4">June 14, 2020</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span className="text-black-50 pr-4">Due Date</span>
                  <span className="pl-4">March 12, 2021</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="table-responsive my-4">
            <Table className="table table-striped table-hover text-nowrap font-size-xs">
              <thead>
                <tr>
                  <th className="wd-20p">Type</th>
                  <th className="wd-40p d-none d-sm-table-cell">Description</th>
                  <th className="tx-center">QTY</th>
                  <th className="tx-right">Unit Price</th>
                  <th className="tx-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tx-nowrap">Software development</td>
                  <td className="d-none d-sm-table-cell text-black-50">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium.
                  </td>
                  <td className="tx-center">2</td>
                  <td className="tx-right">$150.00</td>
                  <td className="tx-right">$300.00</td>
                </tr>
                <tr>
                  <td className="tx-nowrap">Photoshop design</td>
                  <td className="d-none d-sm-table-cell text-black-50">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis...
                  </td>
                  <td className="tx-center">1</td>
                  <td className="tx-right">$1,200.00</td>
                  <td className="tx-right">$1,200.00</td>
                </tr>
                <tr>
                  <td className="tx-nowrap">Server configuration</td>
                  <td className="d-none d-sm-table-cell text-black-50">
                    Et harum quidem rerum facilis est et expedita distinctio
                  </td>
                  <td className="tx-center">2</td>
                  <td className="tx-right">$850.00</td>
                  <td className="tx-right">$1,700.00</td>
                </tr>
                <tr>
                  <td className="tx-nowrap">Build mobile app</td>
                  <td className="d-none d-sm-table-cell text-black-50">
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur
                  </td>
                  <td className="tx-center">3</td>
                  <td className="tx-right">$850.00</td>
                  <td className="tx-right">$2,550.00</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="divider mb-4" />
          <Grid container spacing={6}>
            <Grid item lg={8}>
              <div className="rounded p-3 bg-secondary mb-4">
                <div className="text-uppercase text-primary mb-2 font-size-xs">
                  Notes
                </div>
                <p className="font-size-sm mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </div>
            </Grid>
            <Grid item lg={4}>
              <ul className="list-unstyled mb-3">
                <li className="d-flex justify-content-between pb-1">
                  <span className="pr-4">Sub-Total</span>
                  <span className="pl-4">$5,750.00</span>
                </li>
                <li className="d-flex justify-content-between pb-1">
                  <span className="pr-4">Tax (5%)</span>
                  <span className="pl-4">$287.50</span>
                </li>
                <li className="d-flex justify-content-between pb-1">
                  <span className="pr-4">Discount</span>
                  <span className="pl-4">-$50.00</span>
                </li>
                <li className="d-flex justify-content-between font-weight-bold pt-3 pb-2 font-size-lg">
                  <span className="pr-4">Total Due</span>
                  <span className="pl-4">$5,987.50</span>
                </li>
              </ul>
              <Button fullWidth className="btn-primary">
                Pay invoice{' '}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
