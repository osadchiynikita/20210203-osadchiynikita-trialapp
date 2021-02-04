import React from 'react';
import { Typography, Row, Col } from 'antd';
import styles from './UserOutput.module.scss';

const { Title } = Typography;

interface IProps {
  formData: any;
}

interface IInfoItemProps {
  label: string;
  children: React.ReactNode;
}

const InfoItem: React.FC<IInfoItemProps> = ({ label, children }) => {
  return (
    <div className={styles.infoItem}>
      <label>{label}:</label>
      <span>{children}</span>
    </div>
  );
};

const UserOutput: React.FC<IProps> = ({ formData }) => {
  console.log(formData);
  const { name, gender, age, email, country, city } = formData;

  return (
    <>
      <Title level={4}>Personal Information</Title>

      <Row gutter={48}>
        <Col span={12}>
          <InfoItem label={'Name'}>{name}</InfoItem>
          <InfoItem label={'Gender'}>{gender}</InfoItem>
          <InfoItem label={'Age'}>{age}</InfoItem>
        </Col>

        <Col span={12}>
          <InfoItem label={'Email'}>{email}</InfoItem>
          <InfoItem label={'Country'}>{country}</InfoItem>
          <InfoItem label={'City'}>{city}</InfoItem>
        </Col>
      </Row>
    </>
  );
};

export default UserOutput;
