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
  const [data, setData] = useState([]);
  const [original] = useState([
    { title: "Codigo", field: "codigo" },
    { title: "Rollos restantes", field: "rollos_stock" },
    { title: "Metros restantes", field: "metros_stock" },
    { title: "Textilera", field: "textilera" },
    { title: "Tipo", field: "tipo" },
    { title: "Descripcion", field: "descripcion" },
    { title: "Rollos", field: "rollos" },
    { title: "Metros", field: "metros" },
    {
      title: "Fecha Remito",
      field: "fecha_remito",
      type: "date"
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date"
    },
    { title: "Color", field: "color" },
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
          src={`./uploads/telas/${rowData.telaImagen}`}
          alt={rowData.title}
          style={{ width: 40, borderRadius: "50%" }}
        />
      )
    }
  ]);
  const [columns, setColumns] = useState([
    {
      title: "Estampado",
      field: "estampado",
      render: rowData => (
        <FormCheckbox
          toggle
          name="estampado"
          defaultChecked={rowData.estampado}
          disabled
        />
      ),
      tableData: {
        columnOrder: 8,
        groupSort: "asc"
      }
    },
    {
      title: "Tela",
      field: "telaImagen",
      render: rowData => (
        <img
          alt={rowData.title}
          src={`./uploads/telas/${rowData.telaImagen}`}
          style={{ width: 40, borderRadius: "50%" }}
        />
      ),
      tableData: {
        columnOrder: 9,
        groupSort: "asc"
      }
    }
  ]);
  const [toggle, setToggle] = useState({});
  const [dropdownMenu, setDropdownMenu] = useState(false);

  useEffect(() => {
    async function fechData() {
      const optionsColumns = await axios("/opciones/tela/stock");
      const tela = await axios("/tela");
      let nuevasColumnas = [...optionsColumns.data.valor, ...columns];
      setColumns(nuevasColumnas);

      formatData(tela.data);
    }
    fechData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return async () => {
      const envio = columns.filter(elemet => {
        return elemet.title !== "Tela" && elemet.title !== "Estampado";
      });
      await axios.put("/opciones/tela/stock", envio);
    };
  }, [columns]);

  const formatData = dataReceived => {
    let reductor = dataReceived.reduce((valorAnterior, valorActual) => {
      const mapeador = valorActual.datos.map(element => {
        return {
          codigo: element.codigo,
          metros_stock: element.metros_stock,
          rollos_stock: element.rollos_stock,
          textilera: valorActual.textilera,
          tipo: element.tipo,
          descripcion: element.descripcion,
          rollos: element.rollos,
          metros: element.metros,
          remito: valorActual.remito,
          temporada: element.temporada,
          fecha_remito: valorActual.fecha_remito,
          telaImagen: element.telaImagen,
          estampado: element.estampado,
          fecha: valorActual.fecha,
          color: element.color,
          factura: element.factura
        };
      });

      return [...valorAnterior, ...mapeador];
    }, []);
    setData(reductor);
  };
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
                    backgroundColor: "white",
                    display: "flex"
                  }}
                >
                  <img
                    style={{
                      height: "300px",
                      width: "45%",
                      display: "inline-block",
                      margin: "auto"
                    }}
                    alt={rowData.title}
                    src={`./uploads/telas/${rowData.telaImagen}`}
                  />
                  <img
                    style={{
                      height: "300px",
                      width: "45%",
                      display: "inline-block",
                      margin: "auto"
                    }}
                    alt={rowData.title}
                    src={`./uploads/facturas/${rowData.factura}`}
                  />
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
