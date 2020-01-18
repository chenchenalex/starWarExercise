import React from "react";
import Styles from "./tableListStyle.css";

export default function TableList({ data, onSelect }) {
  const dataArray = [];
  for (let i in data) {
    dataArray.push(data[i]);
  }

  return (
    <table styles={Styles}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
        </tr>
      </thead>
      <tbody>
        {dataArray.map(row => (
          <tr data-id={row.id} key={row.id} onClick={() => onSelect(row.id)}>
            <td>{row.name}</td>
            <td>{row.height}</td>
            <td>{row.mass}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
