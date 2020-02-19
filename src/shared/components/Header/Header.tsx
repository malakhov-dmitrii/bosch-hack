/* eslint-disable no-restricted-globals */
import React from 'react';
import styles from './Header.module.scss';
import { Logo } from '../../Icons/NavSvg/NavSvg';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <div className={styles.Flex}>
          <div className={styles.NavRow}>
            <div className={styles.Link}>Portal</div>
            <div className={styles.Link}>Charts</div>
            <div className={styles.ActiveLink}>Dashboard</div>
          </div>
        </div>
        <div className={styles.Link}>Logout</div>
      </div>
    </div>
  );
};

export default Header;
