import React from 'react';
import styles from './ProductsChart.module.scss';

interface IProps {
  data: Record<string, any>[];
}

const ProductsChart: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <label>Graph</label>
      </header>
      Chart data
    </div>
  );
};

export default ProductsChart;
