import React, { useState, Fragment, useEffect } from "react";
import MaterialTable from "material-table";
import {
  Col,
  Row,
  Card,
  CardBody,
  Badge,
  Button,
  FormCheckbox
} from "shards-react";
import "../../assets/components/ImprimirRemito.css";
import { PdfDocument } from "../../components/tela/impresion_tela";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";

export default function Stock(props) {
  const [pdf, setPdf] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/tela");
      setData(result.data);
    };
    fetchData();
  }, []);

  const showPDF = e => {
    let newPdf = (
      <PDFDownloadLink
        document={<PdfDocument inputs={data[e.target.dataset.idtable]} />}
        fileName="ingresoTela.pdf"
        style={{
          fontSize: "32px"
        }}
      >
        {({ blob, url, loading, error }) => {
          return loading ? (
            "Cargando..."
          ) : (
            <i className="material-icons">print</i>
          );
        }}
      </PDFDownloadLink>
    );
    setPdf(newPdf);
  };

  return (
    <Col sm="12" md="12" className="">
      <h1 className="TelaStockTitulo">Imprimir remito</h1>
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
          header: {
            actions: "Eliminar"
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
        columns={[
          {
            title: "Fecha",
            field: "fecha",
            type: "date"
            // editComponent: props => (
            //   <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
            //     <input
            //       className="MuiInputBase-input MuiInput-input"
            //       type="date"
            //       value={props.value}
            //       onChange={e => props.onChange(e.target.value)}
            //     />
            //   </div>
            // )
          },
          { title: "Textilera", field: "textilera" },
          {
            title: "Fecha Remito",
            field: "fecha_remito",
            type: "date"
            // editComponent: props => (
            //   <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
            //     <input
            //       className="MuiInputBase-input MuiInput-input"
            //       type="date"
            //       value={props.value}
            //       onChange={e => props.onChange(e.target.value)}
            //     />
            //   </div>
            // )
          },
          { title: "Remito", field: "remito" },
          {
            title: "Tela",
            field: "imageUrl",
            render: rowData => {
              return (
                <div className="ImprimirRemitoDetalleGrid">
                  {rowData.datos.map((dato, index, array) => {
                    let cant = array.length;
                    return (
                      <img
                        alt="Detalle remito"
                        key={index}
                        src={`/uploads/telas/${dato.telaImagen}`}
                        className="ImprimirRemitoDetalleGridImagen"
                        style={{ width: 80 / cant }}
                      />
                    );
                  })}
                </div>
              );
            }
          }
        ]}
        data={data}
        title={pdf}
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let nuevo = data;
                  const index = nuevo.indexOf(oldData);
                  nuevo.splice(index, 1);
                  setData([...nuevo]);
                }
                resolve();
              }, 1000);
            })
        }}
        detailPanel={[
          {
            tooltip: "Mostrar mas",
            render: rowData => {
              return (
                <Fragment>
                  {rowData.datos.map((data, index) => (
                    <Row key={index}>
                      <Col lg="12" sm="12" className="mb-2">
                        <Card
                          small
                          className="card-post card-post--aside card-post--1 ImprimirRemitoDetalleCard"
                        >
                          <div
                            className="card-post__image"
                            style={{
                              backgroundImage: `url(/uploads/telas/${data.telaImagen})`
                            }}
                          >
                            <Badge
                              pill
                              className={`card-post__category bg-dark`}
                            >
                              {data.color}
                            </Badge>
                          </div>
                          <CardBody>
                            <h5 className="card-title text-fiord-blue">
                              {`Codigo: ${data.codigo}`}
                            </h5>
                            <p className="card-text mb-1">{`Descripcion: ${data.descripcion}`}</p>
                            <p className="card-text mb-1">{`Tipo: ${data.tipo}`}</p>
                            <p className="card-text mb-1">{`Metros: ${data.metros}`}</p>
                            <p className="card-text mb-1">{`Rollos: ${data.rollos}`}</p>
                            <p className="card-text mb-1">
                              Ver factura:
                              <a
                                href={`/uploads/facturas/${data.factura}`}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <i className="fas fa-ticket-alt"></i>
                              </a>
                            </p>

                            <div className="ImprimirRemitoEstampado">
                              <label className="ImprimirRemitoEstampadoLabel">
                                Estampado:
                              </label>
                              <FormCheckbox
                                toggle
                                name="estampado"
                                defaultChecked={data.estampado}
                                disabled
                              />
                            </div>

                            <span className="text-muted">{`Temporada: ${data.temporada}`}</span>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))}
                  <span className="FormValidationIngresarIzquierda">
                    <Button
                      onClick={showPDF}
                      data-idtable={rowData.tableData.id}
                    >
                      Generar Pdf
                    </Button>
                  </span>
                </Fragment>
              );
            }
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100]
          // filtering: true
        }}
      />
    </Col>
  );
}
