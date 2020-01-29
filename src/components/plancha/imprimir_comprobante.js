import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
  //   Image
} from "@react-pdf/renderer";
import "../../assets/enviarPlanchar.css";
// import moment from "moment";
const styles = StyleSheet.create({
  page: {
    padding: "30"
  },
  section: { color: "black", textAlign: "center", margin: 30 }
});

export default function document(props) {
  console.log(props);
  return (
    <Document>
      <Page debug={true} size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text>{props.data.prueba}</Text>
          {/* <Text>hola</Text> */}
        </View>
      </Page>
    </Document>
  );
}
