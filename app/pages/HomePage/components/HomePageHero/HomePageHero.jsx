import React from 'react';
import PropTypes from 'prop-types';

import styles from './HomePageHero.scss';


const HomePageHero = ({ title, description }) => (
  <div className={styles.hero}>
    <div className={styles.textPane}>
      <h1 className={styles.title}>{ title }</h1>
      <div className={styles.description}>
        { description }
      </div>
    </div>
  </div>
);


HomePageHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

HomePageHero.defaultProps = {
  description: undefined,
};

export default HomePageHero;
