import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import axios from 'axios';

export default function Stats({ navigation }) {
  const [items, setItems] = useState([]);
  const [itemToThrow, setItemToThrow] = useState([]);
  const [pieData, setPieData] = useState([])
  const [perc, setPerc] = useState(0.0);

  useEffect(() => {
    axios.get("https://what2keep.azurewebsites.net/user-items/6372afe73424d5135a63f183/").then((res) => {
      console.log(res)
      setItems(res);
      let i = 0;
      let n = 0;
      for (let j in res) {
        if (res[j].usage > 0) {
          i += 1;
        }
        n += 1;
      }
      i = i * 100;
      setPerc(i/n);
      let ind = 0;
      for (let i in res) {
        if (res[i].usage < res[ind].usage) {
          ind = i
        }
      }
      setItemToThrow(res[ind]);
      let list = []
      let dt = {};
      for (let i in res) {
        dt[res[[i].category]] = 1 + dt[res[[i].category]]
      }
      for (let i in  dt) {
        list.push({
          name: i,
          value: 100*(dt[i]/n)
       })
      }
    });
  });
  return (
    <View>
      <Text>Stats</Text>
      <PieChart width={730} height={300}>
        <Pie
          data={this.pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {this.pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={this.COLORS[index % this.COLORS.length]}
              />
          ))}
        </Pie>
        <Tooltip content={<this.CustomTooltip />} />
        <Legend />
      </PieChart>
      <Text> You have use {perc}% of your items in the last week </Text>
      <Text> Item to Throw: {itemToThrow.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
