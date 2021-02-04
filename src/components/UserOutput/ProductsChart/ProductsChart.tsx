import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './ProductsChart.module.scss';

interface IProps {
  data: Record<string, any>[];
}

const ProductsChart: React.FC<IProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any>(null);

  const convertToChartData = useCallback(raw => {
    const convertedData = raw.reduce(
      (acc: any, { Product, Price }: any) => {
        return {
          ...acc,
          labels: [...acc.labels, Product],
          prices: [...acc.prices, Price]
        };
      },
      { labels: [], prices: [] }
    );

    setChartData(convertedData);
  }, []);

  useEffect(() => {
    if (data) {
      convertToChartData(data);
    }
  }, [data, convertToChartData]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <label>Graph</label>
      </header>

      {chartData ? (
        <Bar
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Product Prices',
                data: chartData.prices,
                backgroundColor: [
                  // TODO: Generate colors programmatically
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }
            ]
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      ) : (
        'No data'
      )}
    </div>
  );
};

export default ProductsChart;
