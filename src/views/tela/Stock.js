import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import {
  Col,
  FormCheckbox,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";
import "../../assets/tela-stock.css";
import axios from "axios";

export default function Stock(props) {
  const [data] = useState([
    {
      codigo: "dasdasdasd",
      metros_restantes: 20,
      metros_rollos: 2,
      textilera: "Textilera",
      tipo: "vengalina",
      descripcion: "Tela bonita ++",
      rollos: 10,
      metros: 30,
      remito: "2047514",
      temporada: "verano",
      remito_fecha: "09/06/2018",
      imageUrl:
        "https://mlstaticquic-a.akamaihd.net/tela-de-tapiceria-rojo-crystal-0010-D_NQ_NP_980236-MLU27905183489_082018-O.webp",
      estampado: false
    },
    {
      codigo: "eeeeeee",
      metros_restantes: 20,
      metros_rollos: 2,
      textilera: "holii",
      tipo: "vengalina",
      descripcion: "Tela bonita ++",
      rollos: 10,
      metros: 30,
      remito: "123456",
      temporada: "verano",
      remito_fecha: "09/06/2018",
      imageUrl:
        "https://mlstaticquic-a.akamaihd.net/tela-de-tapiceria-rojo-crystal-0010-D_NQ_NP_980236-MLU27905183489_082018-O.webp",
      estampado: true
    }
  ]);
  const [original] = useState([
    { title: "Codigo", field: "codigo" },
    {
      title: "Rollos restantes",
      field: "metros_rollos",
      type: "numeric"
    },
    {
      title: "Metros restantes",
      field: "metros_restantes",
      type: "numeric"
    },
    { title: "Textilera", field: "textilera" },
    { title: "Tipo", field: "tipo" },
    { title: "Descripcion", field: "descripcion" },
    { title: "Rollos", field: "rollos", type: "numeric" },
    { title: "Metros", field: "metros", type: "numeric" },
    {
      title: "Fecha Remito",
      field: "remito_fecha",
      type: "date"
    },
    { title: "Remito", field: "remito" },
    {
      title: "Temporada",
      field: "temporada",
      lookup: { invierno: "invierno", verano: "verano" }
    },
    {
      title: "Estampado",
      field: "estampado",
      render: rowData => {
        return (
          <FormCheckbox
            toggle
            name="estampado"
            defaultChecked={rowData.estampado}
            disabled
          />
        );
      }
    },
    {
      title: "Tela",
      field: "imageUrl",
      render: rowData => (
        <img
          src={rowData.imageUrl}
          alt={rowData.title}
          style={{ width: 40, borderRadius: "50%" }}
        />
      )
    }
  ]);
  const [columns, setColumns] = useState([
    // { title: "Codigo", field: "codigo" },
    // {
    //   title: "Rollos restantes",
    //   field: "metros_rollos",
    //   type: "numeric"
    // },
    // {
    //   title: "Metros restantes",
    //   field: "metros_restantes",
    //   type: "numeric"
    // },
    { title: "Textilera", field: "textilera" },
    { title: "Tipo", field: "tipo" },
    { title: "Descripcion", field: "descripcion" },
    { title: "Rollos", field: "rollos", type: "numeric" },
    { title: "Metros", field: "metros", type: "numeric" },
    {
      title: "Fecha Remito",
      field: "remito_fecha",
      type: "date"
    },
    { title: "Remito", field: "remito" },
    {
      title: "Temporada",
      field: "temporada",
      lookup: { invierno: "invierno", verano: "verano" }
    },
    {
      title: "Estampado",
      field: "estampado",
      render: rowData => {
        return (
          <FormCheckbox
            toggle
            name="estampado"
            defaultChecked={rowData.estampado}
            disabled
          />
        );
      }
    },
    {
      title: "Tela",
      field: "imageUrl",
      render: rowData => (
        <img
          alt={rowData.title}
          src={rowData.imageUrl}
          style={{ width: 40, borderRadius: "50%" }}
        />
      )
    }
  ]);
  const [toggle, setToggle] = useState({});
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const onChangeColumnHidden = event => {
    if (event.target.dataset.cambio === "true") {
      let nuevaData = columns.filter(
        column => event.target.dataset.title !== column.title
      );
      setColumns(nuevaData);
    } else {
      let nuevaColumna = original.find(
        ori => event.target.dataset.title === ori.title
      );
      let nuevaData = [...columns];
      nuevaData.splice(event.target.dataset.index, 0, nuevaColumna);
      setColumns(nuevaData);
    }
  };
  return (
    <Col sm="12" md="12" className="">
      <h1 className="TelaStockTitulo">Stock de tela</h1>
      <InputGroup
        onMouseOver={() => {
          setDropdownMenu(true);
        }}
        onMouseLeave={() => {
          setDropdownMenu(false);
        }}
        className="mb-3"
      >
        <Dropdown
          open={dropdownMenu}
          toggle={which => {
            const newState = { toggle };
            newState[which] = !toggle[which];
            setToggle(newState);
          }}
          addonType="append"
        >
          <DropdownToggle caret>Columnas</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              {original.map((valorOriginal, index) => {
                return (
                  <FormCheckbox
                    key={index}
                    data-index={index}
                    data-title={valorOriginal.title}
                    data-cambio={
                      columns.find(valor => valorOriginal.title === valor.title)
                        ? true
                        : false
                    }
                    defaultChecked={columns.find(valor =>
                      valorOriginal.title === valor.title ? true : false
                    )}
                    onChange={onChangeColumnHidden}
                  >
                    {valorOriginal.title}
                  </FormCheckbox>
                );
              })}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </InputGroup>

      <MaterialTable
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "Filas"
          },
          toolbar: {
            nRowsSelected: "{0} fila(s) seleccionada(s)",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar"
          },
          body: {
            emptyDataSourceMessage: "Ningún dato para mostrar",
            filterRow: {
              filterTooltip: "Filtrar"
            },
            addTooltip: "Agregar",
            deleteTooltip: "Eliminar",
            editTooltip: "Editar",
            editRow: {
              deleteText: "¿Esta seguro de eliminar?",
              cancelTooltip: "Cancelar",
              saveTooltip: "Confirmar"
            }
          }
        }}
        columns={columns}
        data={data}
        title=" "
        detailPanel={[
          {
            tooltip: "Show Name",
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: "center",
                    backgroundColor: "white"
                  }}
                >
                  <img alt={rowData.title} src={rowData.imageUrl} />
                </div>
              );
            }
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100]
          // exportButton: true,
          // filtering: true,
          // selection: true
        }}
        onRowClick={(event, rowData) => {
          console.log("holaa");
          // setSelected({
          //   selected: [...selected, rowData.tableData.id]
          // });
        }}
      />
    </Col>
  );
}
