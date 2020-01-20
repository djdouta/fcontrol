import React, { Fragment } from "react";
import "../../assets/components/TableTalles.css";

export default function TableTalles(props) {
  return (
    <Fragment>
      <table className="TableTalles">
        <tbody>
          <tr>
            <td>
              <button
                className={
                  props.talles.uno.activo === true
                    ? "TableTallesActive"
                    : undefined
                }
                onClick={props.handleTalles}
                data-talle="uno"
                data-valor={props.talles.uno.valor}
                data-activo={props.talles.uno.activo}
                data-index={props.index}
                disabled={props.readOnly}
              >
                {props.talles.uno.valor}
              </button>
            </td>
            <td>
              <button
                className={
                  props.talles.dos.activo === true
                    ? "TableTallesActive"
                    : undefined
                }
                onClick={props.handleTalles}
                data-talle="dos"
                data-valor={props.talles.dos.valor}
                data-activo={props.talles.dos.activo}
                data-index={props.index}
                disabled={props.readOnly}
              >
                {props.talles.dos.valor}
              </button>
            </td>
            <td>
              <button
                className={
                  props.talles.tres.activo === true
                    ? "TableTallesActive"
                    : undefined
                }
                onClick={props.handleTalles}
                data-talle="tres"
                data-valor={props.talles.tres.valor}
                data-activo={props.talles.tres.activo}
                data-index={props.index}
                disabled={props.readOnly}
              >
                {props.talles.tres.valor}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                className={
                  props.talles.cuatro.activo === true
                    ? "TableTallesActive"
                    : undefined
                }
                onClick={props.handleTalles}
                data-talle="cuatro"
                data-valor={props.talles.cuatro.valor}
                data-activo={props.talles.cuatro.activo}
                data-index={props.index}
                disabled={props.readOnly}
              >
                {props.talles.cuatro.valor}
              </button>
            </td>
            <td>
              <button
                className={
                  props.talles.cinco.activo === true
                    ? "TableTallesActive"
                    : undefined
                }
                onClick={props.handleTalles}
                data-index={props.index}
                data-talle="cinco"
                data-valor={props.talles.cinco.valor}
                data-activo={props.talles.cinco.activo}
                disabled={props.readOnly}
              >
                {props.talles.cinco.valor}
              </button>
            </td>
            <td>
              <button
                className={
                  props.talles.seis.activo === true
                    ? "TableTallesActive"
                    : undefined
                }
                onClick={props.handleTalles}
                data-index={props.index}
                data-talle="seis"
                data-valor={props.talles.seis.valor}
                data-activo={props.talles.seis.activo}
                disabled={props.readOnly}
              >
                {props.talles.seis.valor}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          className={
            props.talles.unico.activo === true
              ? "TableTallesActive BotonTalleUnico"
              : "BotonTalleUnico"
          }
          onClick={props.handleTalles}
          data-talle="unico"
          data-valor={props.talles.unico.valor}
          data-activo={props.talles.unico.activo}
          data-index={props.index}
          disabled={props.readOnly}
        >
          {props.talles.unico.valor}
        </button>
      </div>
    </Fragment>
  );
}
