import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
  //   Image
} from "@react-pdf/renderer";
import "../../assets/enviarTaller.css";
// import moment from "moment";
const styles = StyleSheet.create({
  page: {
    padding: "60px 50px 50px 50px"
  },
  section: { color: "black", textAlign: "center", margin: 30 },
  cm3: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  title: { margin: "5px", fontSize: 20 },
  borderBottom: {
    borderBottomColor: "black",
    borderBottomStyle: "solid",
    borderBottomWidth: 3,
    fontSize: 20
  },
  com70: {
    width: "64%"
  },
  com15: {
    width: "13%"
  },
  com41: {
    width: "45%"
  },
  com40: {
    width: "40%"
  },
  com8: {
    width: "8%"
  },
  com10: {
    width: "10%"
  },
  separador: {
    margin: "8px 2px",
    textAlign: "center"
  }
});

export default function document(props) {
  return (
    <Document>
      <Page debug={true} size="A3" orientation="landscape" style={styles.page}>
        <View style={styles.cm3}>
          <Text style={[styles.title, styles.com15, styles.separador]}>
            Reponsable:
          </Text>
          <Text style={[styles.borderBottom, styles.com70, styles.separador]}>
            Humberto (Gabriel)
          </Text>
          <Text style={[styles.title, styles.com8, styles.separador]}>
            Fecha:
          </Text>
          <Text style={[styles.borderBottom, styles.com15, styles.separador]}>
            30/01/2020
          </Text>
        </View>
        <View style={styles.cm3}>
          <Text style={[styles.title, styles.com8, styles.separador]}>
            Corte:
          </Text>
          <Text style={[styles.borderBottom, styles.com15, styles.separador]}>
            5
          </Text>
          <Text style={[styles.title, styles.com10, styles.separador]}>
            Articulo:
          </Text>
          <Text style={[styles.borderBottom, styles.com41, styles.separador]}>
            10-005E
          </Text>
          <Text style={[styles.title, styles.com8, styles.separador]}>
            Total:
          </Text>
          <Text style={[styles.borderBottom, styles.com15, styles.separador]}>
            2001
          </Text>
        </View>
        <View style={styles.cm3}>
          <Text style={[styles.title, styles.com10, styles.separador]}>
            Modelo:
          </Text>
          <Text style={[styles.borderBottom, styles.com40, styles.separador]}>
            Blusa
          </Text>
          <Text style={[styles.title, styles.com8, styles.separador]}>
            Tela:
          </Text>
          <Text style={[styles.borderBottom, styles.com40, styles.separador]}>
            Kendav
          </Text>
        </View>
      </Page>
    </Document>
  );
}
