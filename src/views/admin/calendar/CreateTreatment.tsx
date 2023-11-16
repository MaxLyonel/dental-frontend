import { ComponentDate, ComponentInput } from "@/components"
import { useForm, usePatientStore } from "@/hooks";
import { FormTreatmentValidations, FormTreatmenttModel, PatientModel, StageTypeModel, ThethModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormTreatmenttModel = {
  stageTypeId: null,
  patientId: null,
  description: '',
  date: null,
  totalAmount: 0,
  thethIds: [],
}

const formValidations: FormTreatmentValidations = {
  stageTypeId: [(value: any) => value != null, 'Debe ingresar el numero de carnet'],
  patientId: [(value: any) => value != 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
  date: [(value: Date) => value != null, 'Debe ingresar la fecha de nacimiento'],
  totalAmount: [(value: number) => value != 0, 'Debe ingresar el genero'],
  thethIds: [(value: ThethModel[]) => value.length >= 1, 'Debe ingresar la alergia'],
}

export const CreateTreatment = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreatePatient, putUpdatePatient } = usePatientStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    identityCard, name, lastName, phone, birthDate, gender, allergies, bloodType,
    onInputChange, isFormValid, onResetForm, onValueChange,
    identityCardValid, nameValid, lastNameValid, phoneValid, birthDateValid, genderValid, allergiesValid, bloodTypeValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreatePatient(
        {
          identityCard: parseInt(identityCard),
          name: name.trim(),
          lastName: lastName.trim(),
          phone: parseInt(phone),
          birthDate: birthDate,
          gender: gender,
          allergies: allergies,
          bloodType: bloodType,
        });
    } else {
      putUpdatePatient(item.patientId,
        {
          identityCard: identityCard,
          name: name.trim(),
          lastName: lastName.trim(),
          phone: phone,
          birthDate: birthDate,
          gender: gender,
          allergies: allergies,
          bloodType: bloodType,
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Tratamiento' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Carnet de Identidad"
                  name="identityCard"
                  value={identityCard}
                  onChange={onInputChange}
                  error={!!identityCardValid && formSubmitted}
                  helperText={formSubmitted ? identityCardValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  error={!!nameValid && formSubmitted}
                  helperText={formSubmitted ? nameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Genero"
                  name="gender"
                  value={gender}
                  onChange={onInputChange}
                  error={!!genderValid && formSubmitted}
                  helperText={formSubmitted ? genderValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Telefono"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  error={!!phoneValid && formSubmitted}
                  helperText={formSubmitted ? phoneValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentDate
                  title="Fecha de nacimiento"
                  date={birthDate}
                  onChange={(date) => onValueChange('birthDate', date)}
                  error={!!birthDateValid && formSubmitted}
                  helperText={formSubmitted ? birthDateValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Alergias"
                  name="allergies"
                  value={allergies}
                  onChange={onInputChange}
                  error={!!allergiesValid && formSubmitted}
                  helperText={formSubmitted ? allergiesValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Tipo de sangre"
                  name="bloodType"
                  value={bloodType}
                  onChange={onInputChange}
                  error={!!bloodTypeValid && formSubmitted}
                  helperText={formSubmitted ? bloodTypeValid : ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
