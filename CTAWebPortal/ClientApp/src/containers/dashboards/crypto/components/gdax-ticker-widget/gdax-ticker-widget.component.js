import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import themeStyles from './gdax-ticker-widget.theme.style';

class GdaxTickerWidget extends React.Component {
  constructor(props) {
    super(props);
    this.marquee = null;
    this.strip = null;
    this.startOffsetX = 0;
    this.offsetX = 0;
    this.speed = 0.60;
    this.animationCallback = null;

    this.state = {
      products: null
    };

    this.setMarqueeRef = (element) => {
      this.marquee = element;
    };

    this.setStripRef = (element) => {
      this.strip = element;
    };
  }

  async componentDidMount() {
    const res = await fetch('https://api.gdax.com/products');
    const data = await res.json();
    if (data) {
      this.setState({ products: data });
    }

    setTimeout(() => {
      const startPosition = this.strip.getBoundingClientRect();
      this.startOffsetX = startPosition.x;
      this.animationCallback = window.requestAnimationFrame(this.animate.bind(this));
    }, 1000);

    const subscribe = {
      type: 'subscribe',
      channels: [
        {
          name: 'ticker',
          product_ids: data.map(product => product.id)
        }
      ]
    };

    this.ws = new WebSocket('wss://ws-feed.gdax.com');

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
    };

    this.ws.onmessage = (e) => {
      const value = JSON.parse(e.data);
      if (value.type !== 'ticker') {
        return;
      }

      const index = this.state.products.findIndex(product => product.id === value.product_id);
      if (index !== -1) {
        const { products } = this.state;
        products[index].socket = value;
        this.setState({ products });
      }
    };
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationCallback);
    this.ws.close();
  }

  animate = () => {
    this.offsetX -= 1 * this.speed;
    this.marquee.style.transform = `translate(${this.offsetX}px, 0) translateZ(0)`;
    const stripPos = this.strip.getBoundingClientRect();
    if (stripPos.x < (-stripPos.width + this.startOffsetX)) {
      this.offsetX = 0;
    }
    this.animationCallback = window.requestAnimationFrame(this.animate.bind(this));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes['portal-gdx-ticket-widget']}>
        <div className={classes['ticker-container']}>
          <div ref={this.setMarqueeRef} className={classes['ticker-content']}>
            <div ref={this.setStripRef} className={classes['ticker-strip']} key="original">
              {this.state.products && this.state.products.map(product => (
                <div className={classes['ticker-item']} key={product.id}>
                  <div className={classes['ticker-item__name']}>
                    <img
                      alt={product.display_name}
                      src={`${process.env.PUBLIC_URL}/assets/images/dashboards/crypto/${product.base_currency}.svg`}
                    />
                    <Typography component="h2">{product.display_name}</Typography>
                  </div>
                  {product.socket ?
                    <Typography component="h4">${parseFloat(product.socket.price).toFixed(2)}</Typography> : ''}
                </div>
              ))}
            </div>
            <div className={classes['ticker-strip']} key="copy">
              {this.state.products && this.state.products.map(product => (
                <div className={classes['ticker-item']} key={product.id}>
                  <div className={classes['ticker-item__name']}>
                    <img
                      alt={product.display_name}
                      src={`${process.env.PUBLIC_URL}/assets/images/dashboards/crypto/${product.base_currency}.svg`}
                    />
                    <Typography component="h2">{product.display_name}</Typography>
                  </div>
                  {product.socket ?
                    <Typography component="h4">${parseFloat(product.socket.price).toFixed(2)}</Typography> : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GdaxTickerWidget.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(GdaxTickerWidget);
