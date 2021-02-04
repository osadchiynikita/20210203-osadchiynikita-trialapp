import React from 'react';
import styles from './InfoItem.module.scss';

interface IProps {
  label: string;
  children: React.ReactNode;
}

const InfoItem: React.FC<IProps> = ({ label, children }) => {
  return (
    <div className={styles.item}>
      <label>{label}:</label>
      <span>{children || 'Not specified'}</span>
    </div>
  );
};

export default InfoItem;
