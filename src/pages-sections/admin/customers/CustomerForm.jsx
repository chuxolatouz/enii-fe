import { Button, Card, Grid, TextField } from "@mui/material";
import { Formik } from "formik";

// ================================================================

// ================================================================

const CustomerForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit, reinitialize = false, shrink = false } = props;
  
  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        enableReinitialize={reinitialize}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="nombre"
                  label="Nombre"
                  color="info"
                  size="medium"
                  placeholder={shrink ? "Nombre" : ""}
                  value={values.nombre}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.nombre && !!errors.nombre}
                  helperText={touched.nombre && errors.nombre}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  fullWidth
                  color="info"
                  size="medium"
                  name="email"
                  label="Correo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Correo"
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item  xs={12}>
                <TextField
                  rows={6}
                  fullWidth
                  color="info"
                  size="medium"
                  name="password"
                  label="Contraseña"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  {shrink ? "Actualizar": "Crear"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default CustomerForm;
