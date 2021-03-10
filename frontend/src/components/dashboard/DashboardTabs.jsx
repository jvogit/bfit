import React, { useState } from "react";
import CalorieListItem from "components/dashboard/CalorieListItem";
import { StatefulTabs as Tabs, Tab } from "baseui/tabs-motion";
import { Accordion, Panel } from "baseui/accordion";
import { getRecords } from "services/records/CalorieRecordsService";
import {
  startOfWeek,
  endOfWeek,
  getDay,
  parse,
} from "date-fns";

const tabProps = {
  title: "Calorie Counts",
  overrides: {
    TabPanel: {
      style: {
        padding: "0",
      }
    }
  },
}

const fakeRecord = {
  date: "2020-12-25",
  items: [
    {
      name: "Banana Pie",
      calories: 500,
    },
    {
      name: "Apple Pie",
      calories: 500,
    },
    {
      name: "Steak",
      calories: 1000,
    },
  ]
};

const getWeekRange = () => {
  let current = new Date();
  let option = { weekStartsOn: 1 };
  return [startOfWeek(current, option).toLocaleDateString("en-CA"), endOfWeek(current, option).toLocaleDateString("en-CA")];
}

const mapDataToWeekData = (data) => {
  let weekData = new Array(7).fill(null);
  for ( var i = 0; i < data.length; ++i ) {
    let record = data[i];
    let day = getDay(parse(record.date, 'yyyy-MM-dd', new Date()));
    weekData[day - 1] = record;
  }

  return weekData;
}

export default () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    let [start, end] = getWeekRange();
    getRecords(start, end)
      .then(records => {
        setData(mapDataToWeekData(records));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Tabs>
      <Tab {...tabProps}>
        <Accordion accordion={false}>
          {loading ?
          (
            <Panel title="Loading" />
          )
          :
          (
            data.map((record, index) => {
              return (<CalorieListItem key={index} data={record} />);
            })
          )
          }
        </Accordion>
      </Tab>
    </Tabs>
  );
}