import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import addDays from "date-fns/addDays";
import parseISO from "date-fns/parseISO";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik } from "formik";

// ================================================================

// ================================================================

const ProductForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit } = props;

  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Category"
                  onChange={handleChange}
                  value={values.category}
                  label="Select Category"
                  SelectProps={{
                    multiple: true,
                  }}
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item md={6} xs={12}>

                <DatePicker
                  label="Fecha de Inicio"
                  // maxDate={new Date()}
                  value={addDays(parseISO(values.date), 1)}
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
                      value: values.date,
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
                    value={addDays(parseISO(values.date), 1)}
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
                        value: values.date,
                        helperText: touched.fecha_inicio && errors.fecha_inicio,
                        error: Boolean(
                          !!touched.fecha_inicio && !!errors.fecha_inicio
                        ),
                      },
                    }}
                  />
                </Grid>
              </LocalizationProvider>
                    

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Crear
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
