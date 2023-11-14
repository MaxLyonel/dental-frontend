import { ComponentDate, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useAdministratorStore } from "@/hooks";
import { FormAdministratorModel, FormAdministratorValidations, RoleModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { RoleTable } from "../role";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormAdministratorModel = {
  identityCard: 0,
  name: '',
  lastName: '',
  phone: 0,
  birthDate: null,
  gender: '',
  roleId: null,
}

const formValidations: FormAdministratorValidations = {
  identityCard: [(value: number) => value != 0, 'Debe ingresar el numero de carnet'],
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
  phone: [(value: number) => value != 0, 'Debe ingresar el numero de telefono'],
  birthDate: [(value: Date) => value != null, 'Debe ingresar la fecha de nacimiento'],
  gender: [(value: string) => value.length >= 1, 'Debe ingresar el genero'],
  roleId: [(value: RoleModel) => value != null, 'Debe ingresar el nombre'],
}
export const CreateAdministrator = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateAdministrator, putUpdateAdministrator } = useAdministratorStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    identityCard, name, lastName, phone, birthDate, gender, roleId,
    onInputChange, isFormValid, onResetForm, onValueChange,
    identityCardValid, nameValid, lastNameValid, phoneValid, birthDateValid, genderValid, roleIdValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateAdministrator(
        {
          identityCard: parseInt(identityCard),
          name: name.trim(),
          lastName: lastName.trim(),
          phone: parseInt(phone),
          birthDate: birthDate,
          gender: gender,
          roleId: roleId.id,
        });
    } else {
      putUpdateAdministrator(item.administratorId,
        {
          identityCard: identityCard,
          name: name.trim(),
          lastName: lastName.trim(),
          phone: phone,
          birthDate: birthDate,
          gender: gender,
          roleId: roleId.id,
        });
    }
    handleClose();
    onResetForm();
  }

  const [modalRole, setModalRole] = useState(false);
  const handleModalRole = useCallback((value: boolean) => {
    setModalRole(value);
  }, []);
  return (
    <>
      {
        modalRole &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Roles:'
          opendrawer={modalRole}
          handleDrawer={handleModalRole}
        >
          <RoleTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (roleId == null || roleId.id != v.id) {
                onValueChange('roleId', v)
                handleModalRole(false)
              }
            }}
            items={roleId == null ? [] : [roleId.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Administrador' : `${item.name}`}</DialogTitle>
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={roleId != null ? 'Rol' : ''}
                  title={roleId != null ? roleId.name : 'Rol'}
                  onPressed={() => handleModalRole(true)}
                  error={!!roleIdValid && formSubmitted}
                  helperText={formSubmitted ? roleIdValid : ''}
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
