import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Formik, Field } from "formik";

const RequestForm = (props) => {
  const { validationSchema, handleFormSubmit } = props;
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, {}]);
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };
  
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{ name: "", items }}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        const itemsField = (
          <Field name="items">
            {({ field, form, meta }) => (
              <Grid>
                {items.map((item, index) => (
                  <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        name={`items[${index}].nombre_regla`}
                        label="Nombre"
                        color="info"
                        size="medium"
                        value={item.nombre_regla}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        name={`items[${index}].monto`}
                        label="Monto"
                        color="info"
                        size="medium"
                        type="number"
                        value={item.monto}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="outlined"
                        
                        color="error"
                        onClick={() => removeItem(index)}
                        >
                        Eliminar
                      </Button>
                      </Grid>
                  </Grid>
                ))}
                <Button
                  variant="outlined"
                  color="success"
                  onClick={addItem}
                >
                  Agregar Item
                </Button>
              </Grid>
            )}
          </Field> 
        );

        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Regla"
                  color="info"
                  size="medium"
                  placeholder="Regla"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                >
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                {itemsField}
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="info" type="submit" >
                  Crear
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export default RequestForm;