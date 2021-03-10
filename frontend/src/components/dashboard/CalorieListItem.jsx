import React from "react";
import { StatefulPanel } from "baseui/accordion";
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';
import { Button } from "baseui/button";
import { useHistory } from "react-router";

const Title = (data) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      padding: "10px",
    }}>
      <div>
        {data.date}
      </div>
      <div>
        Total Calories: {
          data.items.map(item => item.calories)
          .reduce((a, b) => a + b)
        }
      </div>
      <div />
    </div>
  );
}

export default ({ data }) => {

  const history = useHistory();

  if (!data) {
    return (
      <StatefulPanel title="No data!"/>
    )
  }
  return (
    <StatefulPanel title={Title(data)}>
      <TableBuilder data={data.items}>
        <TableBuilderColumn header="Food">
          {row => row.name}
        </TableBuilderColumn>
        <TableBuilderColumn header="Calories" numeric>
          {row => row.calories}
        </TableBuilderColumn>
      </TableBuilder>
    </StatefulPanel>
  );
}