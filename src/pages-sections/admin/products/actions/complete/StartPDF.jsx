import React from 'react';
import {
  Document, Text, Page, View, StyleSheet,
} from '@react-pdf/renderer';
import { format } from 'date-fns';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  headerColumn: {
    flesGrow: 1,
    justifyContent: 'space-around',
  },
  section: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionDown: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
  },
  textHeader: {
    fontSize: 16,
  },
  textBody: {
    fontSize: 10,
  },
});

function Acta({ project }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerColumn}>
          <View style={styles.header}>UCV</View>
          <View style={styles.header}>
            <Text>Universidad Central de Venezuela</Text>
            <Text>Facultad de Ciencias</Text>
            <Text>Escuela de Computación</Text>
            <Text>ENII</Text>
          </View>
          <View style={styles.header}>Ciencias</View>
        </View>
        <View style={styles.section}>
          <Text>Acta de Inicio</Text>
          <Text>{project.nombre}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeader}>Descripción de Proyecto</Text>
          <Text style={styles.textBody}>{project.descripcion}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeader}>Balance inicial</Text>
          <Text style={`El proyecto inicia con un monto de $${styles.textHeader}`}>{project.balance_inicial}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeader}>Miembros involucrados</Text>
          {project?.miembros?.map((user) => <Text style={styles.textBody}>{`${user.usuario.nombre} bajo el rol: ${user.role.label} el dia ${user.fecha_ingreso}`}</Text>)}
        </View>
        <View style={styles.sectionDown}>
          <Text>
            Caracas
            {' '}
            {format(new Date(project.fecha_inicio), "dd MMM, yyyy")}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Acta;
