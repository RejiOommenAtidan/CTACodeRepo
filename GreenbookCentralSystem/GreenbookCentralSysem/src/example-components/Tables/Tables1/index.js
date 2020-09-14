import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-4 shadow-xxl mb-spacing-6-x2">
        <div className="table-responsive-md">
          <Table className="table table-alternate-spaced">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th style={{ width: '400px' }} scope="col">
                  Product
                </th>
                <th scope="col">Client</th>
                <th scope="col">Amount</th>
                <th scope="col">VAT</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center text-black-50">
                  <span>#545</span>
                </td>
                <td>
                  <b>Apple Macbook PRO</b>
                  <span className="d-block text-black-50 font-size-sm">
                    Lorem ipsum dolor sic amet
                  </span>
                </td>
                <td>
                  <span>Rupert Bryan</span>
                </td>
                <td className="font-size-lg font-weight-bold">
                  <small>$</small>
                  <span>2,495</span>
                </td>
                <td className="text-warning">
                  <span>21%</span>
                </td>
                <td className="text-right">
                  <Button className="btn-neutral-first rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40">
                    Pay Invoice
                  </Button>
                  <Button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['fas', 'search']}
                      className="font-size-sm"
                    />
                  </Button>
                  <Button className="btn-neutral-first mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'edit']}
                      className="font-size-sm"
                    />
                  </Button>
                  <Button className="btn-neutral-danger mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td className="text-center text-black-50">
                  <span>#548</span>
                </td>
                <td>
                  <b>Apple Watch 4</b>
                  <span className="d-block text-black-50 font-size-sm">
                    Short project description here
                  </span>
                </td>
                <td>
                  <span>Kate Jorah</span>
                </td>
                <td className="font-size-lg font-weight-bold">
                  <small>$</small>
                  <span>2,184</span>
                </td>
                <td className="text-warning">
                  <span>19%</span>
                </td>
                <td className="text-right">
                  <Button className="btn-neutral-first rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40">
                    Pay Invoice
                  </Button>
                  <Button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['fas', 'search']}
                      className="font-size-sm"
                    />
                  </Button>
                  <Button className="btn-neutral-first mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'edit']}
                      className="font-size-sm"
                    />
                  </Button>
                  <Button className="btn-neutral-danger mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td className="text-center text-black-50">
                  <span>#546</span>
                </td>
                <td>
                  <b>iPhone 11 PRO Max</b>
                  <span className="d-block text-black-50 font-size-sm">
                    Short project description here
                  </span>
                </td>
                <td>
                  <span>Emma Taylor</span>
                </td>
                <td className="font-size-lg font-weight-bold">
                  <small>$</small>
                  <span>1,594</span>
                </td>
                <td className="text-warning">
                  <span>21%</span>
                </td>
                <td className="text-right">
                  <Button className="btn-neutral-first rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40">
                    Pay Invoice
                  </Button>
                  <Button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['fas', 'search']}
                      className="font-size-sm"
                    />
                  </Button>
                  <Button className="btn-neutral-first mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'edit']}
                      className="font-size-sm"
                    />
                  </Button>
                  <Button className="btn-neutral-danger mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
}
