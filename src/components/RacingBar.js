import React from 'react';
import BarChart from 'chart-race-react';
import mock from '../data.json';


let data = {}
// export let data = ['apple', 'banana', 'orange'].reduce((res, item) => ({...res, ...{[item]: Array(20).fill(0).map(_ => Math.floor(20 * Math.random()))}}), {});
const timeArr = []
let obj = {
  low: [0],
  medium: [0],
  high: [0],
  critical: [0]
}
function getData() {
  let j = 0;
  let epoch = new Date(mock[mock.length - 1]['@timestamp']).getTime()
  timeArr.push(new Date(mock[mock.length - 1]['@timestamp']).toUTCString())
  for (let i = mock.length-1; i >= 0; i--){
    if (new Date(mock[i]['@timestamp']).getTime() !== epoch) {
      epoch = new Date(mock[i]['@timestamp']).getTime()
      timeArr.push(new Date(mock[i]['@timestamp']).toUTCString())
      j += 1
      obj['critical'][j] = obj['critical'][j-1]
      obj['low'][j] = obj['low'][j-1]
      obj['medium'][j] = obj['medium'][j-1]
      obj['high'][j] = obj['high'][j-1]
      // console.log({obj});
    }
    
    // console.log(mock[i]['cve_severity'], obj[mock[i]['cve_severity']][j], mock[i]['cve_cvss_score'], epoch);
    if (obj[mock[i]['cve_severity']].length) {
      obj[mock[i]['cve_severity']][j] = obj[mock[i]['cve_severity']][j] + mock[i]['cve_cvss_score']
    } else {
      obj[mock[i]['cve_severity']][j] = [mock[i]['cve_cvss_score']]
    }
  }
}
getData();
// console.log({obj});
data = obj;

const randomColor = (i) => {
  return `rgba(5,42,222,${0.4 + i*0.2})`;
}

const len = data[Object.keys(data)[0]].length;
const keys = Object.keys(data);
const colors = keys.reduce((res, item, i) => ({ 
    ...res, 
    ...{ [item]: randomColor(i) } 
}), {});

const labels = keys.reduce((res, item, idx) => {
  return{
  ...res, 
  ...{[item]: (
    <div style={{textAlign:"center", textTransform: 'capitalize'}}>
      <div>{item}</div>
    </div>
    )}
}}, {});

export default () => {
  return (
    <div className="racing-bar-chart">
      <h1>Racing Bar Chart</h1>
      <h5>Severity Type vs Severity Score Sum with Time</h5>
      <div style={{width: `500px`}}>
        <BarChart
        start={true}
        data={data} 
        timeline={timeArr}
        labels={labels}
        colors={colors}
        len={len}
        timeout={40}
        delay={10}
        timelineStyle={{
          textAlign: "center",
          fontSize: "16px",
          color: "rgb(148, 148, 148)",
          marginBottom: "24px"
        }}
        textBoxStyle={{
          textAlign: "right",
          color: "rgb(133, 131, 131)",
          fontSize: "16px",
        }}
        barStyle={{
          height: "32px",
          marginTop: "20px",
          borderRadius: "4px",
        }}
        width={[15, 65, 20]}
        maxItems={4}
        />
      </div>
   
    </div>
  )
}