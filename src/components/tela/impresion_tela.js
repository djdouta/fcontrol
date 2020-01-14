import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#e4e4e4",
    textDecoration: "underline",
    textTransform: "uppercase"
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  textileraContainer: {
    boderColor: "#e4e4e4",
    borderSyle: "solid",
    borderWidth: 2,
    flex: 1
  },
  remitoContainer: {
    borderTop: "2 solid black",
    borderBottom: "2 solid black",
    borderRight: "2 solid black",
    flex: 1
  },
  tituloTexteliera: {
    margin: 15,
    fontSize: 30
  },
  fecha: {
    margin: "2 22 10 15"
  },
  image: {
    height: 100,
    width: "30%",
    marginTop: "10px",
    marginButtom: 10,
    margin: "auto"
  },
  datos: {
    padding: "5px",
    borderTop: "2 solid black",
    borderRight: "2 solid black",
    fontSize: 10
  },
  table: {
    borderCollapse: "collapse",
    display: "flex",
    flexDirection: "row",
    border: "2 solid black"
  },
  body: {
    padding: "30px"
  },
  descripcion: {
    width: "60%"
  },
  rojo: {
    color: "red"
  },
  bordeAbajo: {
    borderBottom: "0"
  },
  eliminarBordeArriba: {
    borderTop: "0"
  }
});
export function PdfDocument(props) {
  console.log(props);
  return (
    <Document>
      <Page size="A4">
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={styles.textileraContainer}>
              <Text style={styles.tituloTexteliera}>
                {props.inputs.textilera}
              </Text>
              <Text style={styles.fecha}>{`Fecha: ${props.inputs.fecha}`}</Text>
            </View>
            <View style={styles.remitoContainer}>
              <Text style={styles.tituloTexteliera}>{props.inputs.remito}</Text>
              <Text style={styles.fecha}>
                {`Remio Fecha: ${props.inputs.fecha_remito}`}
              </Text>
            </View>
          </View>
          {props.inputs.datos.map((dato, index) => (
            <View
              key={index}
              style={[styles.table, styles.eliminarBordeArriba]}
            >
              <View style={styles.descripcion}>
                <Text style={[styles.datos, styles.eliminarBordeArriba]}>
                  {`Cantidad de rollos: ${dato.rollos}`}
                </Text>
                <Text style={styles.datos}>{`Metros totales: ${
                  dato.metros
                }`}</Text>
                <Text style={styles.datos}>{`Codigo : ${dato.codigo}`} </Text>
                <Text style={styles.datos}>
                  {`Estampado: ${dato.estampado === true ? "Si" : "No"}`}
                </Text>
                <Text style={styles.datos}>{`Color: ${dato.color}`} </Text>
                <Text style={styles.datos}>
                  {`Tipo de tela: ${dato.tipo}`}{" "}
                </Text>
                <Text
                  style={[styles.datos, styles.bordeAbajo]}
                >{`Descripcion: ${dato.descripcion}`}</Text>
              </View>
              <Image style={styles.image} source={dato.imagen} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
