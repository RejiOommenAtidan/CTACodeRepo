import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  InputLabel,
  InputAdornment,
  Card,
  MenuItem,
  Button,
  Tooltip,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

export default function LivePreviewExample() {
  const [entries, setEntries] = useState('1');

  const handleChange = (event) => {
    setEntries(event.target.value);
  };

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header py-3">
          <div className="card-header--title font-size-lg">Support board</div>
          <div className="card-header--actions">
            <Button size="small" className="btn-neutral-primary">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'plus-circle']} />
              </span>
              <span className="btn-wrapper--label">Add ticket</span>
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between px-4 py-3">
          <div className="d-flex align-items-center">
            <span>Show</span>
            <FormControl size="small" variant="outlined" className="mx-3">
              <InputLabel id="select-entries-label">Entries</InputLabel>
              <Select
                labelId="select-entries-label"
                id="select-entries"
                value={entries}
                onChange={handleChange}
                label="Entries">
                <MenuItem className="mx-2" value={1}>
                  All entries
                </MenuItem>
                <MenuItem className="mx-2" value={10}>
                  10
                </MenuItem>
                <MenuItem className="mx-2" value={15}>
                  15
                </MenuItem>
                <MenuItem className="mx-2" value={20}>
                  20
                </MenuItem>
                <MenuItem className="mx-2" value={25}>
                  25
                </MenuItem>
                <MenuItem className="mx-2" value={30}>
                  30
                </MenuItem>
              </Select>
            </FormControl>
            <span>entries</span>
          </div>
          <div className="search-wrapper">
            <TextField
              variant="outlined"
              size="small"
              id="input-search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        <div className="divider" />
        <div className="table-responsive-md">
          <Table className="table table-hover text-nowrap mb-0">
            <thead>
              <tr>
                <th className="bg-white text-left">ID</th>
                <th className="bg-white">Requester</th>
                <th className="bg-white text-left">Subject</th>
                <th className="bg-white text-center">Assignee</th>
                <th className="bg-white text-center">Priority</th>
                <th className="bg-white text-center">Status</th>
                <th className="bg-white text-center">Created date</th>
                <th className="bg-white text-center">Due date</th>
                <th className="bg-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-weight-bold">#453</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar1} />
                      </div>
                    </div>
                    <div>Shanelle Wynn</div>
                  </div>
                </td>
                <td>When, while the lovely valley teems</td>
                <td className="text-center">
                  <div
                    className="avatar-icon-wrapper avatar-icon-sm"
                    title="Lili Pemberton">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-danger text-danger">
                    High
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-dark text-dark">
                    Closed
                  </div>
                </td>
                <td className="text-center text-black-50">12/12/2020</td>
                <td className="text-center text-black-50">08/30/2021</td>
                <td className="text-center">
                  <Button
                    size="small"
                    className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">#584</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar3} />
                      </div>
                    </div>
                    <div>Brody Dixon</div>
                  </div>
                </td>
                <td>I am so happy, my dear friend</td>
                <td className="text-center">
                  <Tooltip title="Arvin Weston">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar4} />
                      </div>
                    </div>
                  </Tooltip>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-warning text-warning">
                    Low
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-success text-success">
                    Open
                  </div>
                </td>
                <td className="text-center text-black-50">06/08/2022</td>
                <td className="text-center text-black-50">07/25/2023</td>
                <td className="text-center">
                  <Button
                    size="small"
                    className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">#764</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar5} />
                      </div>
                    </div>
                    <div>Milton Ayala</div>
                  </div>
                </td>
                <td>His own image, and the breath</td>
                <td className="text-center">
                  <Tooltip title="Mali Rosario">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar6} />
                      </div>
                    </div>
                  </Tooltip>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-info text-info">
                    Medium
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-dark text-dark">
                    Closed
                  </div>
                </td>
                <td className="text-center text-black-50">12/12/2020</td>
                <td className="text-center text-black-50">08/30/2021</td>
                <td className="text-center">
                  <Button
                    size="small"
                    className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">#453</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar1} />
                      </div>
                    </div>
                    <div>Kane Gentry</div>
                  </div>
                </td>
                <td>When I hear the buzz</td>
                <td className="text-center">
                  <div
                    className="avatar-icon-wrapper avatar-icon-sm"
                    title="Marion Devine">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-warning text-warning">
                    Low
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-neutral-success text-success">
                    Open
                  </div>
                </td>
                <td className="text-center text-black-50">12/12/2020</td>
                <td className="text-center text-black-50">08/30/2021</td>
                <td className="text-center">
                  <Button
                    size="small"
                    className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="card-footer py-3 d-flex justify-content-between">
          <Pagination
            className="pagination-second"
            variant="outlined"
            count={10}
          />
          <div className="d-flex align-items-center">
            <span>Show</span>
            <FormControl size="small" variant="outlined" className="mx-3">
              <InputLabel id="select-entries-label">Entries</InputLabel>
              <Select
                labelId="select-entries-label"
                id="select-entries"
                value={entries}
                onChange={handleChange}
                label="Entries">
                <MenuItem className="mx-2" value={1}>
                  All entries
                </MenuItem>
                <MenuItem className="mx-2" value={10}>
                  10
                </MenuItem>
                <MenuItem className="mx-2" value={15}>
                  15
                </MenuItem>
                <MenuItem className="mx-2" value={20}>
                  20
                </MenuItem>
                <MenuItem className="mx-2" value={25}>
                  25
                </MenuItem>
                <MenuItem className="mx-2" value={30}>
                  30
                </MenuItem>
              </Select>
            </FormControl>
            <span>entries</span>
          </div>
        </div>
      </Card>
    </>
  );
}
