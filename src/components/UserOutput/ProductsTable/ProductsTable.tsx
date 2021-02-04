import React, { useMemo } from 'react';
import { Table } from 'antd';
import styles from './ProductsTable.module.scss';

interface IProps {
  data: Record<string, any>[];
}

const ProductsTable: React.FC<IProps> = ({ data }) => {
  const columns: any = useMemo(
    () => [
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
    ],
    []
  );

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
