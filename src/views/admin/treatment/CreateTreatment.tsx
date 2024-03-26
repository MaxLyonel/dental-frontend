import { ComponentDate, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useTreatmentStore } from "@/hooks";
import { FormTreatmentValidations, FormTreatmenttModel, ThethModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { StageTypeTable } from "../stageType";
import { PatientTable } from "../patient";
import { ThethTable } from "../theth";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormTreatmenttModel = {
  patientId: null,
  description: '',
  date: null,
  totalAmount: 0,
}

const formValidations: FormTreatmentValidations = {
  patientId: [(value: any) => value != 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
  date: [(value: Date) => value != null, 'Debe ingresar la fecha de nacimiento'],
  totalAmount: [(value: number) => value != 0, 'Debe ingresar el genero'],
}

export const CreateTreatment = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateTreatment, putUpdateTreatment } = useTreatmentStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    patientId, description, date, totalAmount,
    onInputChange, isFormValid, onResetForm, onValueChange,
    patientIdValid, descriptionValid, dateValid, totalAmountValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(item)
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateTreatment(
        {
          stageTypeId: 1,
          patientId: patientId.id,
          description: description.trim(),
          date: date,
          totalAmount: parseFloat(totalAmount),
          thethIds:[],
        });
    } else {
      putUpdateTreatment(item.treatmentId,
        {
          stageTypeId: 1,
          patientId: patientId.id,
          description: description.trim(),
          date: date,
          totalAmount: parseFloat(totalAmount),
          thethIds: [],
        });
    }
    handleClose();
    onResetForm();
  }
  // stage type
  const [modalStageType, setModalStageType] = useState(false);
  const handleModalStageType = useCallback((value: boolean) => {
    setModalStageType(value);
  }, []);
  // patient
  const [modalPatient, setModalPatient] = useState(false);
  const handleModalPatient = useCallback((value: boolean) => {
    setModalPatient(value);
  }, []);
  //theth
  const [modalTheth, setModalTheth] = useState(false);
  const handleModalTheth = useCallback((value: boolean) => {
    setModalTheth(value);
  }, []);
  return (
    <>

      {
        modalPatient &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='ponentes:'
          opendrawer={modalPatient}
          handleDrawer={handleModalPatient}
        >
          <PatientTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (patientId == null || patientId.id != v.id) {
                onValueChange('patientId', v)
                handleModalPatient(false)
              }
            }}
            items={patientId == null ? [] : [patientId.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Evento' : `${item.description}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={patientId != null ? 'Ponente' : ''}
                  title={patientId != null ? patientId.user.name : 'Ponente'}
                  onPressed={() => handleModalPatient(true)}
                  error={!!patientIdValid && formSubmitted}
                  helperText={formSubmitted ? patientIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Descripción"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  error={!!descriptionValid && formSubmitted}
                  helperText={formSubmitted ? descriptionValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentDate
                  title="Fecha"
                  date={date}
                  onChange={(date) => onValueChange('date', date)}
                  error={!!dateValid && formSubmitted}
                  helperText={formSubmitted ? dateValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Monto total"
                  name="totalAmount"
                  value={totalAmount}
                  onChange={onInputChange}
                  error={!!totalAmountValid && formSubmitted}
                  helperText={formSubmitted ? totalAmountValid : ''}
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
