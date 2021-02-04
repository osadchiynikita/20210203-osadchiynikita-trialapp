import React from 'react';
import { Typography, Row, Col } from 'antd';
import styles from './UserOutput.module.scss';

import InfoItem from './InfoItem';
import ProductsTable from './ProductsTable';

const { Title } = Typography;

interface IProps {
  formData: any;
}

const UserOutput: React.FC<IProps> = ({ formData }) => {
  const { name, gender, age, email, country, city, fileData } = formData;

  return (
    <>
      <Title level={4}>Personal Information</Title>

      <div className={styles.section}>
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
      </div>

      <div className={styles.section}>
        <Row gutter={48}>
          <Col span={12}>
            <ProductsTable fileData={fileData} />
          </Col>

          <Col span={12}>Graph</Col>
        </Row>
      </div>
    </>
  );
};

export default UserOutput;
