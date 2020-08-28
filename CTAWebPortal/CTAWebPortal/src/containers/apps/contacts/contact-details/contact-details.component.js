import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import compose from 'recompose/compose';
import themeStyles from './contact-details.theme.style';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import scss from './contact-details.module.scss';

import FontAwesome from 'react-fontawesome';

const ContactDetails = (props) => {
  const {
    selectedContact,
    classes
  } = props;

  return (
    <div className={classNames(scss['portal-contact-details'] )}>
      <div
        className={classNames(
          scss['portal-contact-details__header'],
          classes.portalContactDetailsHeader
        )}
      >
      </div>
      <div
        className={classNames(
          scss['portal-contact-details__content'],
          classes.portalContactDetailsContent
        )}
      >

        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={3}>
            <div
              className={classNames(
                scss['portal-contact-details__avatar-container']
              )}
            >
              <div
                className={classNames(
                  scss['portal-contact-details__avatar'],
                  classes.portalContactDetailsAvatar
                )}
              >
                <img
                  className={classNames(
                    classes.portalContactDetailsAvatarImg
                  )}
                  src={`${process.env.PUBLIC_URL}/${selectedContact.photo}`}
                  alt={`${process.env.PUBLIC_URL}/${selectedContact.name}`}
                />
              </div>
              <div
                className={classNames(
                  scss['portal-contact-details__extra'],
                  classes.portalContactDetailsExtra
                )}
              >
                <p>{selectedContact.gender}, age {selectedContact.age}</p>
                <p>{selectedContact.region}</p>
                <p>{selectedContact.phone}</p>
                <p>{selectedContact.email}</p>
                <p>{selectedContact.birthday.dmy}</p>
                <br />

                <FontAwesome name="twitter" className={classNames(
                  classes.portalContactDetailsSocialIcons
                )} />
                <FontAwesome name="facebook" className={classNames(
                  classes.portalContactDetailsSocialIcons
                )} />
                <FontAwesome name="linkedin" className={classNames(
                    classes.portalContactDetailsSocialIcons
                  )} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <div
              className={classNames(
                scss['portal-contact-details__main']
              )}
            >
              <Typography variant="headline" gutterBottom>{selectedContact.name}, {selectedContact.surname}</Typography>
              <Typography component="div" dangerouslySetInnerHTML={{ __html: selectedContact.bio }} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

ContactDetails.defaultProps = {
  selectedContact: null
};

ContactDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedContact: PropTypes.shape({})
};
export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(ContactDetails);
