import React from 'react';
import styles from './App.module.scss';

import UserInfo from '../UserInfo';

function App() {
  return (
    <div className={styles.container}>
      <UserInfo />
    </div>
  );
}

export default App;
