import React, { useState, useEffect, useCallback } from 'react';
import { Table, message } from 'antd';
import csvtojson from 'csvtojson';
import styles from './ProductsTable.module.scss';

interface IProps {
  fileData: string;
}

const ProductsTable: React.FC<IProps> = ({ fileData }) => {
  const [data, setData] = useState<any>(null);

  const parseData = useCallback(async () => {
    try {
      const data: any = await csvtojson().fromString(fileData);
      setData(data);
    } catch (err) {
      console.error(err);
    }
  }, [fileData]);

  useEffect(() => {
    if (fileData) {
      parseData().catch(() => message.warn('Something went wrong'));
    }
  }, [fileData, parseData]);

  const columns: any = [
    {
      title: 'Product',
      dataIndex: 'Product',
      key: 'Product'
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      align: 'right'
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <label>Data</label>
      </header>

      {data ? (
        <main className={styles.main}>
          <Table dataSource={data} columns={columns} bordered rowKey={'Product'} />
        </main>
      ) : (
        'File is not uploaded'
      )}
    </div>
  );
};

export default ProductsTable;
