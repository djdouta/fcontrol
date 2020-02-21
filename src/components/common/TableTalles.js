import React, { Fragment } from "react";
import "../../assets/components/TableTalles.css";

export default function TableTalles(props) {
  let createTable = () => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < 2; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 1; j < 4; j++) {
        children.push(
          <td key={j + 3 * i}>
            <button
              key={j + 3 * i}
              className="TableTallesActive"
              onClick={props.handleTalles}
              data-valor={j + 3 * i}
              data-index={props.index}
            >
              {j + 3 * i}
            </button>
          </td>
        );
      }
      //Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };

  return (
    <Fragment>
      <table className="TableTalles">
        <tbody>{createTable()}</tbody>
      </table>
      <div>
        <button
          className="TableTallesActive BotonTalleUnico"
          onClick={props.handleTalles}
          data-valor="u"
          data-index={props.index}
        >
          Unico
        </button>
      </div>
    </Fragment>
  );
}
