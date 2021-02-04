import React, { useCallback, useEffect, useState } from 'react';
import csvtojson from 'csvtojson';
import { Typography, Row, Col, message } from 'antd';
import styles from './UserOutput.module.scss';

import InfoItem from './InfoItem';
import ProductsTable from './ProductsTable';
import ProductsChart from './ProductsChart';

const { Title } = Typography;

interface IProps {
  formData: any;
}

const UserOutput: React.FC<IProps> = ({ formData }) => {
  const [productsData, setProductsData] = useState<any>(null);
  const { name, gender, age, email, country, city, fileData } = formData;

  const parseData = useCallback(async () => {
    try {
      const data: any = await csvtojson().fromString(fileData);
      setProductsData(data);
    } catch (err) {
      console.error(err);
    }
  }, [fileData]);

  useEffect(() => {
    if (fileData) {
      parseData().catch(() => message.warn('Something went wrong'));
    }
  }, [fileData, parseData]);

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
            <ProductsTable data={productsData} />
          </Col>

          <Col span={12}>
            <ProductsChart data={productsData} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserOutput;
