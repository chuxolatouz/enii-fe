import { useState, useEffect } from "react";
import { Button, Card, Grid, MenuItem, TextField, Box } from "@mui/material";
import addDays from "date-fns/addDays";
import parseISO from "date-fns/parseISO";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from 'date-fns/locale/en-GB';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik, FieldArray } from "formik";
import { useApi } from "contexts/AxiosContext";
import { useSnackbar } from "notistack";

// ================================================================

// ================================================================

const ProductForm = (props) => {
  const [categories, setCategories] = useState([]);
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { initialValues, validationSchema, handleFormSubmit, reinitialize = false, shrink = false } = props;

  useEffect(() => {
    api.get('/mostrar_categorias')
    .then((response) => {
      setCategories(response.data);
    }).catch((error) => {    
      console.log(error)        
        if (error.response) {
            enqueueSnackbar(error.response.data.message, { variant: 'error'})
        } else {
            enqueueSnackbar(error.message, { variant: 'error'})
        }
    })
  }, [api, enqueueSnackbar]);
  
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
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
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="categoria"
                  onBlur={handleBlur}
                  placeholder="Categoria"
                  onChange={handleChange}
                  value={values.categoria ? values.categoria : " "}
                  label="Seleccionar Categoria"                  
                  error={!!touched.categoria && !!errors.categoria}
                  helperText={touched.categoria && errors.categoria}                  
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>{category.nombre}</MenuItem>
                  ))}
                </TextField>
              </Grid>


              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="descripcion"
                  label="Descripción"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Descripción"
                  value={values.descripcion}
                  error={!!touched.descripcion && !!errors.descripcion}
                  helperText={touched.descripcion && errors.descripcion}
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
                  name="objetivo_general"
                  label="Objetivo General"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Objetivo General"
                  value={values.objetivo_general}
                  error={!!touched.objetivo_general && !!errors.objetivo_general}
                  helperText={touched.objetivo_general && errors.objetivo_general}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
          {/* Dynamic TextFields for objetivos_especificos */}
          <Grid item xs={12}>
            <FieldArray name="objetivos_especificos">
              {({ push, remove }) => (
                <Box>
                  <Box mb={2}>
                    <Button variant="contained" onClick={() => push("")}>
                      Añadir Objetivo Específico
                    </Button>
                  </Box>
                  {values.objetivos_especificos.map((_, index) => (
                    <Box key={`${index}-objet`} display="flex" alignItems="center" mb={2}>
                      <TextField
                        fullWidth
                        label={`Objetivo Específico ${index + 1}`}
                        name={`objetivos_especificos[${index}]`}
                        value={values.objetivos_especificos[index]}
                        onChange={handleChange}
                      />
                      <Button
                        color="secondary"
                        onClick={() => remove(index)}
                        style={{ marginLeft: "8px" }}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </FieldArray>
          </Grid>

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <Grid item md={6} xs={12}>

                <DatePicker
                  label="Fecha de Inicio"
                  // maxDate={new Date()}
                  value={addDays(parseISO(values.fecha_inicio), 1)}
                  onChange={(newValue) =>
                    setFieldValue("fecha_inicio", newValue)
                  }
                  slots={{
                    textField: TextField,
                  }}
                  slotProps={{
                    textField: {
                      sx: {
                        mb: 1,
                      },
                      size: "medium",
                      fullWidth: true,
                      value: values.fecha_inicio,
                      helperText: touched.fecha_inicio && errors.fecha_inicio,
                      error: Boolean(
                        !!touched.fecha_inicio && !!errors.fecha_inicio
                        ),
                      },
                    }}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePicker
                    label="Fecha Fin"
                    // maxDate={new Date()}
                    value={addDays(parseISO(values.fecha_fin), 1)}
                    onChange={(newValue) =>
                      setFieldValue("fecha_fin", newValue)
                    }
                    slots={{
                      textField: TextField,
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          mb: 1,
                        },
                        size: "medium",
                        fullWidth: true,
                        value: values.fecha_fin,
                        helperText: touched.fecha_fin && errors.fecha_fin,
                        error: Boolean(
                          !!touched.fecha_fin && !!errors.fecha_fin
                        ),
                      },
                    }}
                  />
                </Grid>
              </LocalizationProvider>
                    

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
export default ProductForm;
