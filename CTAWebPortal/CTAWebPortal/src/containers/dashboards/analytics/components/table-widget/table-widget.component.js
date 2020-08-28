import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

import genericSearchData from '../../../../../assets/data/dashboards/generic-search.json';
import paidSearchData from '../../../../../assets/data/dashboards/paid-search.json';

import scss from './table-widget.module.scss';

const tabs = [{
  title: 'Brand Paid Search'
}, {
  title: 'Generic Search'
}];

class TableWidget extends React.Component {
  state = {
    activeTabIndex: 0,
    page: 0,
    rowsPerPage: 5,
    data: genericSearchData
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  changeTab = (event, tabIndex) => {
    const newData = tabIndex === 0 ? genericSearchData : paidSearchData;
    this.setState({ activeTabIndex: tabIndex, data: newData, page: 0 });
  }

  render() {
    const { rowsPerPage, page, data } = this.state;

    return (
      <div className={scss['portal-chart-tabs']}>
        <Tabs
          className={scss['portal-chart-tabs-container']}
          indicatorColor="primary"
          textColor="primary"
          value={this.state.activeTabIndex}
          onChange={this.changeTab}
        >
          {tabs.map(tab => (
            <Tab
              classes={{
                root: scss['portal-chart-tabs-root'],
                wrapper: scss['portal-chart-tabs-wrapper']
              }}
              label={<Typography variant="caption" gutterBottom>{tab.title}</Typography>}
              key={tab.title}
            />
          ))}
        </Tabs>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Page</TableCell>
              <TableCell numeric>Page Views</TableCell>
              <TableCell numeric>Duration</TableCell>
              <TableCell numeric>Conversion Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
              <TableRow key={n.url}>
                <TableCell>{n.url}</TableCell>
                <TableCell numeric>{n.views}</TableCell>
                <TableCell numeric>{n.duration}</TableCell>
                <TableCell numeric>{n.conversion}</TableCell>
              </TableRow>))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={4}
                count={genericSearchData.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5]}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page'
                }}
                onChangePage={this.handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default TableWidget;
