import React, { useEffect, useState } from 'react';
import styles from './Overview.module.scss';
import cn from 'classnames';
import { Typography, Divider, List, Input } from 'antd';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import model_properties from '../../store/mocks/model_properties.json';
import faults from '../../store/mocks/faults.json';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/Button';

const { Title, Text } = Typography;

am4core.useTheme(am4themes_animated);
let chart;

const Overview = () => {
  const [inputVal, setInputVal] = useState('');
  const [faultsList, setFaultsList] = useState(faults);
  useEffect(() => {
    console.log(faults);

    const data = [
      {
        title: 'Good',
        value: model_properties.ds_size - model_properties.ds_faulty_n,
        color: am4core.color('#52c41a'),
      },
      {
        title: 'Bad',
        value: model_properties.ds_faulty_n,
        color: am4core.color('#f5222d'),
      },
    ];

    chart = am4core.create('chartdiv', am4charts.PieChart);
    chart.data = data;

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'title';
    pieSeries.slices.template.propertyFields.fill = 'color';
  }, []);

  useEffect(() => {
    setFaultsList(
      faults.filter(item => {
        if (inputVal) {
          return String(item.id).includes(inputVal);
        }
        return true;
      }),
    );
  }, [inputVal]);

  return (
    <div className={styles.Root}>
      <Title>Incidents Overview</Title>
      <Divider></Divider>

      <div className={styles.Overview}>
        <div className={styles.Col}>
          <Title level={4}>Cases analyzed: 234.483</Title>

          <Link to="/analysis">
            <Button type="primary" size="large" style={{ width: '100%', marginBottom: '20px' }}>
              Get Causes
            </Button>
          </Link>

          <div id="chartdiv" className={styles.Chart}></div>
        </div>
        <Divider type="vertical"></Divider>
        <div className={styles.Col}>
          <Title level={3}>List of incidents</Title>

          <Input
            placeholder="Type here to filter data"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
          ></Input>

          <div className={styles.List}>
            <List
              itemLayout="horizontal"
              dataSource={faultsList}
              renderItem={item => (
                <List.Item>
                  <Link to={`/analysis/${item.id}`} className={styles.Link}>
                    <List.Item.Meta
                      title={<Text>Incident #{item.id}</Text>}
                      description={
                        <div className={styles.ListItem}>
                          <Text>Certainity - {String(item.certainty)}</Text>
                          <Button type="ghost">Analyze</Button>
                        </div>
                      }
                    />
                  </Link>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
