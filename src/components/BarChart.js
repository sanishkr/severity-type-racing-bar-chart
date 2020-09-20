import React from 'react';
import { Bar } from 'react-chartjs-2';

import mock from '../data.json';

const SeverityData = {}
const getSeverityData = () => {
  mock.forEach(item => {
    if (SeverityData[item['cve_severity']]) {
      SeverityData[item['cve_severity']] += 1
    } else {
      SeverityData[item['cve_severity']] = 1
    }
  })
}
getSeverityData()
export default () => {
  return (
    <div>
      <h1>Bar Chart</h1>
      <h5>Severity types & their counts</h5>
      <Bar
      data={{
        labels: Object.keys(SeverityData),
        datasets: [
          {
            label: '# of Total Severities found/Severity Type',
            fill: false,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverRadius: 5,
            borderColor: 'rgba(75,192,192,0.3)',
            backgroundColor: ['rgba(5,42,222,0.4)', 'rgba(5,42,222,0.6)', 'rgba(5,42,222,0.8)', 'rgba(5,42,222,1)'],
            data: Object.values(SeverityData),
          },
        ],
      }}
      width={500}
      height={400}
      options={{ maintainAspectRatio: true }}
      />
    </div>
  )
}