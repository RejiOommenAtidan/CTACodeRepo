import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import themeStyles from './market-cap-widget.theme.style';

class MarketCapWidget extends React.Component {
  state = {
    data: [{
      index: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      marketCap: '$137,411,608,131',
      price: '$8,121.70',
      supply: '16,940,700',
      change: '-0.25%'
    }, {
      index: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      marketCap: '$47,733,845,131',
      price: '$484.95',
      supply: '98,428',
      change: '-0.43%'
    }, {
      index: 3,
      name: 'Ripple',
      symbol: 'XRP',
      marketCap: '$23,453,455,131',
      price: '$0.4345395',
      supply: '39,940,700',
      change: '-0.12%'
    }, {
      index: 4,
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      marketCap: '$15,573,674,661',
      price: '$914.00',
      supply: '17,039,050',
      change: '-0.31%'
    }, {
      index: 5,
      name: 'Litecoin',
      symbol: 'LTC',
      marketCap: '$8,222,510,375',
      price: '$147.37',
      supply: '55.749',
      change: '-0.43%'
    }, {
      index: 6,
      name: 'EOS',
      symbol: 'EOS',
      marketCap: '$4,468,745,596',
      price: '$5.96',
      supply: '752,544,651',
      change: '-0.73%'
    }, {
      index: 7,
      name: 'Cardano',
      symbol: 'ADA',
      marketCap: '$4,304,745,416',
      price: '$0.166033	',
      supply: '25,927,070,538',
      change: '-0.40%'
    }],
    anchorEl: null
  };

  onItemClick = () => {
    this.setState({ data: this.state.data.reverse(), anchorEl: null });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { data, anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <Card className={classes['portal-market-cap-widget']}>
        <CardHeader
          action={
            <IconButton
              aria-owns={anchorEl ? 'store-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title="Market Cap"
          subheader="Showing Top 10"
        />
        <CardContent className={classes['portal-market-cap-widget__table']}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes['table-cell']}>Index</TableCell>
                <TableCell className={classes['table-cell']}>Name</TableCell>
                <TableCell className={classes['table-cell']}>Symbol</TableCell>
                <TableCell className={classes['table-cell']} numeric>Market Cap</TableCell>
                <TableCell className={classes['table-cell']} numeric>Price</TableCell>
                <TableCell className={classes['table-cell']} numeric>Supply</TableCell>
                <TableCell className={classes['table-cell']} numeric>Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.index}>
                  <TableCell className={classes['table-cell']}>{item.index}</TableCell>
                  <TableCell className={classes['table-cell']}>{item.name}</TableCell>
                  <TableCell className={classes['table-cell']}>{item.symbol}</TableCell>
                  <TableCell className={classes['table-cell']}>{item.marketCap}</TableCell>
                  <TableCell className={classes['table-cell']} numeric>{item.price}</TableCell>
                  <TableCell className={classes['table-cell']} numeric>{item.supply}</TableCell>
                  <TableCell className={classes['table-cell']} numeric>{item.change}</TableCell>
                </TableRow>))
              }
            </TableBody>
          </Table>
        </CardContent>
        <Menu
          id="store-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem key={1} onClick={this.onItemClick}>Month</MenuItem>
          <MenuItem key={2} onClick={this.onItemClick}>Week</MenuItem>
          <MenuItem key={3} onClick={this.onItemClick}>Day</MenuItem>
        </Menu>
      </Card>
    );
  }
}

MarketCapWidget.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(MarketCapWidget);
