import React, { useState, Fragment } from "react";
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

export default function Stock(props) {
  const [pdf, setPdf] = useState(null);
  const [pdfShow, setPdfShow] = useState(true);
  const [data, setData] = useState([
    {
      fecha: "15/02/2009",
      fecha_remito: "20/02/2009",
      remito: "20654",
      textilera: "Sin titulo",
      datos: [
        {
          color: "Rojo",
          tipo: "vengalina",
          descripcion: ` Totally words widow one downs few age every 
          seven if miss part by fact`,
          metros: "30",
          rollos: "5",
          metros_restantes: "15",
          rollos_restantes: "2",
          codigo: "415015521",
          estampado: false,
          mostrar: true,
          temporada: "invierno",
          imagen: "/uploads/telas/tela1578594459263.jpg"
        },
        {
          color: "Azul",
          tipo: "vengalina",
          descripcion: "Descripcion 2",
          metros: "300",
          rollos: "50",
          codigo: "asd232",
          estampado: true,
          mostrar: true,
          temporada: "invierno",
          imagen: "/uploads/telas/tela1578594459263.jpg"
        }
      ]
    },
    {
      fecha: "20/02/2009",
      fecha_remito: "20/02/2009",
      remito: "20654",
      textilera: "Sin titulo",
      datos: [
        {
          color: "Verde",
          tipo: "vengalina",
          descripcion: "Descripcion",
          metros: "30",
          rollos: "5",
          metros_restantes: "15",
          rollos_restantes: "2",
          codigo: "415015521",
          estampado: false,
          mostrar: true,
          temporada: "verano",
          imagen:
            "https://image.freepik.com/foto-gratis/textura-tela-verde_23-2147729348.jpg"
        },
        {
          color: "Amarillo",
          tipo: "vengalina",
          descripcion: "Descripcion 2",
          metros: "300",
          rollos: "50",
          codigo: "asd232",
          estampado: true,
          mostrar: true,
          temporada: "verano",
          imagen:
            "https://static8.depositphotos.com/1315253/862/i/950/depositphotos_8624066-stock-photo-yellow-fabric-texture.jpg"
        },
        {
          color: "Amarillo",
          tipo: "vengalina",
          descripcion: "Descripcion 2",
          metros: "300",
          rollos: "50",
          codigo: "asd232",
          estampado: true,
          mostrar: true,
          temporada: "verano",
          imagen:
            "https://image.freepik.com/foto-gratis/textura-tela-morada_23-2147729350.jpg"
        }
      ]
    }
  ]);
  const showPDF = e => {
    let newPdf =
      pdfShow === true ? (
        <PDFDownloadLink
          document={<PdfDocument inputs={data[e.target.dataset.idtable]} />}
          fileName="ingresoTela.pdf"
          style={{
            border: "1px solid #006fe6",
            padding: "10px"
          }}
        >
          {({ blob, url, loading, error }) => {
            return loading ? "Cargando..." : "Descargar reporte";
          }}
        </PDFDownloadLink>
      ) : (
        <div>generar pdf</div>
      );
    setPdfShow(!pdfShow);
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
            type: "date",
            editComponent: props => (
              <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                <input
                  className="MuiInputBase-input MuiInput-input"
                  type="date"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
              </div>
            )
          },
          { title: "Textilera", field: "textilera" },
          {
            title: "Fecha Remito",
            field: "fecha_remito",
            type: "date",
            editComponent: props => (
              <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                <input
                  className="MuiInputBase-input MuiInput-input"
                  type="date"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
              </div>
            )
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
                        src={dato.imagen}
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
        title=" "
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
              console.log(rowData);
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
                              backgroundImage: `url(${data.imagen})`
                            }}
                          >
                            <Badge
                              pill
                              className={`card-post__category bg-dark`}
                            >
                              {data.color}
                            </Badge>
                            {/* <div className="card-post__author d-flex">
                          <a
                            href="#"
                            className="card-post__author-avatar card-post__author-avatar--small"
                            style={{
                              backgroundImage: `url('${post.authorAvatar}')`
                            }}
                          >
                            Written by Anna Ken
                          </a>
                        </div> */}
                          </div>
                          <CardBody>
                            <h5 className="card-title text-fiord-blue">
                              {`Codigo: ${data.codigo}`}
                            </h5>
                            <p className="card-text mb-1">{`Descripcion: ${data.descripcion}`}</p>
                            <p className="card-text mb-1">{`Tipo: ${data.tipo}`}</p>
                            <p className="card-text mb-1">{`Metros: ${data.metros}`}</p>
                            <p className="card-text mb-1">{`Rollos: ${data.rollos}`}</p>
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
                    {pdf}
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
