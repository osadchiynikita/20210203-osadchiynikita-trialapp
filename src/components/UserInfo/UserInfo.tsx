import React, { useState, useCallback, useMemo } from 'react';
import { Radio } from 'antd';
import styles from './UserInfo.module.scss';

import UserForm from '../UserForm';
import UserOutput from '../UserOutput';

interface IUserInfoContentProps {
  selectedTab: string;
  onFormSave: (values: any) => void;
  formData: any;
}

const UserInfoContent: React.FC<IUserInfoContentProps> = ({ selectedTab, onFormSave, formData }) => {
  switch (selectedTab) {
    case 'input':
      return <UserForm onFormSave={onFormSave} />;
    case 'output':
      return <UserOutput formData={formData} />;
    default:
      return <UserForm onFormSave={onFormSave} />;
  }
};

const UserInfo: React.FC<any> = () => {
  const [selectedTab, setSelectedTab] = useState('input');
  const [formData, setFormData] = useState({});

  const onTabChange = useCallback(({ target }) => setSelectedTab(target.value), []);
  const onFormSave = useCallback(values => {
    setFormData(values);
    setSelectedTab('output');
  }, []);

  console.log(formData);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Radio.Group onChange={onTabChange} value={selectedTab}>
          <Radio.Button value="input">Input</Radio.Button>
          <Radio.Button value="output">Output</Radio.Button>
        </Radio.Group>
      </header>

      <main className={styles.content}>
        <UserInfoContent selectedTab={selectedTab} onFormSave={onFormSave} formData={formData} />
      </main>
    </div>
  );
};

export default UserInfo;
