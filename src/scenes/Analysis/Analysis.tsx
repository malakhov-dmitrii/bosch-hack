import React, { useEffect, useState } from 'react';
import styles from './Analysis.module.scss';
import cn from 'classnames';
import Title from 'antd/lib/typography/Title';
import { Divider } from 'antd';
import top_features from '../../store/mocks/top_features.json';
import faults from '../../store/mocks/faults.json';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useHistory, useParams } from 'react-router';

const featureNamesMap: any = {
  '168': 'Voltage features distribution',
  '63': 'Welding speed distribution',
  '37': 'Heat input distribution',
  '11': 'Tm distribution',
  '153': 'Current distribtion',
  '22': 'Gas flow distribution',
};

const Analysis = () => {
  const history = useHistory();
  const [featureid, setFeatureId]: any = useState(null);
  useEffect(() => {
    setFeatureId(history.location.pathname.split('/')[2]);
  }, []);

  return (
    <div>
      <Title>Incidents Analysis</Title>
      <Divider></Divider>

      <div className={styles.Features}>
        {top_features.top_features.map((feature: any) => {
          const faultData = faults.find(fault => String(fault.id) === String(featureid));

          console.log({ faultData });

          let featureData: any;
          if (faultData) {
            //   @ts-ignore
            featureData = faultData.properites.find(prop => prop.f_name === String(feature.name))?.f_x;
            console.log(featureData);
          }

          let lineAdded = false;

          const chartData = feature.histo_good.x.map((x: any, i: number) => {
            if (featureData && x.toFixed(2) === featureData.toFixed(2) && !lineAdded) {
              lineAdded = true;
              return {
                fd: featureData,
                x: featureData,
                y: feature.histo_good.y[i] || 0,
                id: i,
              };
            }
            return {
              x,
              y: feature.histo_good.y[i] || 0,
              id: i,
            };
          });

          const chartDataBad = feature.histo_bad.x.map((x: any, i: number) => ({
            x,
            y: feature.histo_bad.y[i] || 0,
            id: i,
          }));

          console.log(chartData);

          return (
            <div className={styles.Feature}>
              <Title>{featureNamesMap[feature.name]}</Title>

              {!featureid && <Title level={3}>Good cases feature distribution</Title>}

              {featureid && featureData && <Title level={3}>Feature value - {featureData}</Title>}

              <LineChart width={500} height={300} data={chartData}>
                <XAxis dataKey="x" />
                <YAxis />
                {featureid && featureData && (
                  <ReferenceLine x={featureData} label={featureData.toFixed(2)} stroke="red" />
                )}
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
                <Line type="monotone" dataKey="fd" stroke="red" />

                <Tooltip />
              </LineChart>
              {!featureid && (
                <>
                  <Title level={3}>Incidents cases feature distribution</Title>

                  <LineChart width={500} height={300} data={chartDataBad}>
                    <XAxis dataKey="x" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    <Line type="monotone" dataKey="fd" stroke="red" />
                    <Tooltip />
                  </LineChart>
                  <Divider dashed></Divider>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analysis;
