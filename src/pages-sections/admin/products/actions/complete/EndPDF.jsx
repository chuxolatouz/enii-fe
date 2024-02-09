import React from 'react';
import {
  Document, Text, Page, View, StyleSheet,
} from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'


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

function Acta({ project, movements = [], logs = [], budgets= [] }) {
  console.log(logs);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerColumn}>
          <View style={styles.header}><Text>UCV</Text></View>
          <View style={styles.header}>
            <Text>Universidad Central de Venezuela</Text>
            <Text>Facultad de Ciencias</Text>
            <Text>Escuela de Computacion</Text>
            <Text>ENII</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text>Acta de Finalizacion</Text>
          <Text>Proyecto: {project.nombre}</Text>
        </View>
        <View style={styles.sectionDown}>
          <Text>
            Caracas
            {' '}
            {format(new Date(project.fecha_inicio), "dd MMM, yyyy")}
          </Text>
        </View>
      </Page>

      <Page>
        <View style={styles}>
          <Text style={styles.textHeader}>Descripcion del Proyecto</Text>
          <Text style={styles.textBody}>{project.descripcion}</Text>
        </View>
        <View style={styles}>
          <Text style={styles.textHeader}>Balance inicial y final</Text>
          <Text style={styles.textBody}>{`El proyecto inicia con un balance de: $${project.balance_inicial}`}</Text>
          <Text style={styles.textBody}>{`Finalizando con un total de: $${project.balance}`}</Text>
        </View>
        <View style={styles}>
          <Text style={styles.textHeader}>Reglas de distribucion</Text>
          <Text style={styles.textBody}>Las reglas de distribucion definidas para cada rol quedan:</Text>
          <Text style={styles.textBody}>{`Usuarios con role Miembro: %${project.reglas.miembro} `}</Text>
          <Text style={styles.textBody}>{`Usuarios con role Lider: %${project.reglas.lider}`}</Text>
          <Text style={styles.textBody}>{`Usuarios con role Coordinador: %${project.reglas.admin}`}</Text>

        </View>
        <View style={styles}>
          <Text style={styles.textHeader}>Reglas Fijas</Text>
          <Text style={styles.textBody}>{`Descripcion de la regla: ${project.regla_fija.nombre}`}</Text>
          <Text style={styles.textBody}>Las reglas fijas implicadas en este proyecto son las siguientes:</Text>
          {project.regla_fija.reglas.map((regla) => (
            <Text style={styles.textBody} key={`${regla.nombre_regla}+${regla.monto}`}>
              {`- ${regla.nombre_regla} con un monto de: $${parseFloat(regla.monto).toFixed(2)}`}
            </Text>
          ))}
        </View>
        <View style={styles}>
          <Text style={styles.textHeader}>Miembros involucrados</Text>
          {project?.miembros?.map((user) => <Text key={user.usuario._id.$oid} style={styles.textBody}>{`${user.usuario.nombre} bajo el rol: ${user.role.label} el dia ${user.fecha_ingreso}`}</Text>)}
        </View>
      </Page>

      <Page>
        <View>
          <Text style={styles.textHeader}>Movimientos asociados al proyecto</Text>
          <View>
            {logs.map((item) => (
              <Text style={styles.textBody} key={item._id.$oid}>{`fecha: ${format(new Date(item.fecha_creacion.$date), "dd MMM, yyyy HH:mm", { locale: es })} accion: ${item.mensaje}`}</Text>
              ))}
          </View>
        </View>
        <View>
          <Text style={styles.textHeader}>Movimientos monetarios asociados al proyecto</Text>
        </View>
        <View>
          {movements.map((item) => (            
            <Text style={styles.textBody} key={item._id.$oid}>{`accion: ${item.type} monto $${parseFloat(item.amount).toFixed(2)} usuario: ${item.user}`}</Text>
          ))}
        </View>
        <View>
          <Text style={styles.textHeader}>Movimientos de presupuesto asociados al proyecto</Text>
        </View>
        <View>
          {budgets.map((item) => (
            <Text style={styles.textBody} key={item._id.$oid}>{item.descripcion}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default Acta;
