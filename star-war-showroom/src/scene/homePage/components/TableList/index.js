import React from "react";
import Styles from "./tableListStyle.css";
import { NUM_PER_PAGE } from "../../../../constants";

export default function TableList({ data, onSelect, index }) {
  const dataArray = [];

  for (
    let i = index * NUM_PER_PAGE + 1;
    i <= index * NUM_PER_PAGE + NUM_PER_PAGE;
    i++
  ) {
    if (i in data) {
      dataArray.push(data[i]);
    }
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
        {dataArray.length > 0 ? (
          dataArray.map(row => {
            if (row.name) {
              // some fields may be empty
              return (
                <tr
                  data-id={row.id}
                  key={row.id}
                  onClick={() => onSelect(row.id)}
                >
                  <td>{row.name}</td>
                  <td>{row.height}</td>
                  <td>{row.mass}</td>
                </tr>
              );
            }
            return null;
          })
        ) : (
          <tr>
            <td colSpan="3"> Loading in progress ...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
