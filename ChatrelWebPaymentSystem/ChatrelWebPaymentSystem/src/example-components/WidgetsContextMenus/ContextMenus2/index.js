import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  ListItem,
  Tooltip,
  CardContent,
  Card,
  Checkbox,
  Table
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

const MENU_TYPE = 'SIMPLE';

const attributes = {
  className: 'nav-item'
};

const targets = [
  {
    name: 'Facebook',
    date: '16 August 2020',
    content: (
      <div className="d-flex align-items-center">
        <Tooltip title="View Facebook Profile">
          <Button className="btn-facebook btn-pill d-40 p-0 mr-3">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'facebook']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <div>
          <b>Facebook</b>
          <span className="text-black-50 d-block">Social media company</span>
        </div>
      </div>
    )
  },
  {
    name: 'Github',
    date: '22 September 2020',
    content: (
      <div className="d-flex align-items-center">
        <Tooltip title="View Github Profile">
          <Button className="btn-github btn-pill d-40 p-0 mr-3">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'github']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <div>
          <b>Github</b>
          <span className="text-black-50 d-block">Recommended company</span>
        </div>
      </div>
    )
  },
  {
    name: 'Instagram',
    date: '18 October 2020',
    content: (
      <div className="d-flex align-items-center">
        <Tooltip title="View Instagram Profile">
          <Button className="btn-instagram btn-pill d-40 p-0 mr-3">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'instagram']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <div>
          <b>Instagram</b>
          <span className="text-black-50 d-block">
            Sharing images since 2000
          </span>
        </div>
      </div>
    )
  }
];

function collect(props) {
  return { name: props.name };
}

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header pr-2">
          <div className="card-header--title">
            <small>Tables</small>
            <b>Right click context menu in tables</b>
          </div>
          <div className="card-header--actions">
            <Tooltip title="Refresh">
              <Button
                size="small"
                className="btn-link btn-icon hover-scale-lg btn-animated-icon text-primary">
                <FontAwesomeIcon icon={['fas', 'cog']} spin />
              </Button>
            </Tooltip>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="position-relative">
            <ContextMenu
              className="dropdown-menu shadow-xxl bg-white rounded nav nav-neutral-success nav-pills dropdown-menu-xl flex-column p-3"
              id={MENU_TYPE}>
              <MenuItem attributes={attributes}>
                <span className="font-weight-bold px-4 py-2 d-block text-uppercase font-size-sm text-black">
                  Generate reports
                </span>
              </MenuItem>
              <MenuItem attributes={attributes} data={{ item: 'item 1' }}>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'file-pdf']} />
                  </div>
                  <span>Export as PDF</span>
                </ListItem>
              </MenuItem>
              <MenuItem attributes={attributes} data={{ item: 'item 2' }}>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'file-excel']} />
                  </div>
                  <span>Export as Excel</span>
                </ListItem>
              </MenuItem>
              <MenuItem attributes={attributes} data={{ item: 'item 3' }}>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['fas', 'download']} />
                  </div>
                  <span>Download</span>
                </ListItem>
              </MenuItem>
            </ContextMenu>
          </div>
          <div className="table-responsive-md">
            <Table className="table table-hover text-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="text-center" style={{ width: '5%' }}>
                    <Checkbox
                      color="primary"
                      id="CustomCheckboxTableTop"
                      className="align-self-start"
                    />
                  </th>
                  <th>Company</th>
                  <th>Date</th>
                  <th className="text-center" style={{ width: '20%' }}>
                    Status
                  </th>
                  <th>Employee</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {targets.map((item, i) => (
                  <ContextMenuTrigger
                    renderTag="tr"
                    name={item.name}
                    id={MENU_TYPE}
                    holdToDisplay={1000}
                    key={i}
                    collect={collect}>
                    <td className="text-center">
                      <Checkbox
                        color="primary"
                        id={'CustomCheckboxTable' + i}
                        className="align-self-start"
                      />
                    </td>
                    <td>{item.content}</td>
                    <td>
                      <div className="align-box-row">{item.date}</div>
                    </td>
                    <td className="text-center">
                      <div className="badge badge-warning h-auto py-0 px-3">
                        Pending
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar2} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shanelle Wynn
                          </a>
                          <span className="text-black-50 d-block">
                            UI Engineer, Apple Inc.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <Button
                        size="small"
                        className="btn-neutral-first d-30 btn-pill p-0 btn-icon btn-animated-icon">
                        <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                      </Button>
                    </td>
                  </ContextMenuTrigger>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="divider" />
          <div className="divider" />
          <div className="p-3 d-flex justify-content-center">
            <Pagination className="pagination-first" count={6} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
