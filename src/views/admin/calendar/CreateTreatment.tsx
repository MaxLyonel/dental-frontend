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
  const { postCreateTreatment, putUpdateTreatment } = useTreatmentStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    stageTypeId, patientId, description, date, totalAmount, thethIds,
    onInputChange, isFormValid, onResetForm, onValueChange,
    stageTypeIdValid, patientIdValid, descriptionValid, dateValid, totalAmountValid, thethIdsValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateTreatment(
        {
          stageTypeId: stageTypeId.id,
          patientId: patientId.id,
          description: description.trim(),
          date: date,
          totalAmount: parseFloat(totalAmount),
          thethIds: thethIds.map((theth: ThethModel) => theth.id),
        });
    } else {
      putUpdateTreatment(item.treatmentId,
        {
          // identityCard: identityCard,
          // name: name.trim(),
          // lastName: lastName.trim(),
          // phone: phone,
          // birthDate: birthDate,
          // gender: gender,
          // allergies: allergies,
          // bloodType: bloodType,
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
        modalStageType &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='etapas:'
          opendrawer={modalStageType}
          handleDrawer={handleModalStageType}
        >
          <StageTypeTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (stageTypeId == null || stageTypeId.id != v.id) {
                onValueChange('stageTypeId', v)
                handleModalStageType(false)
              }
            }}
            items={stageTypeId == null ? [] : [stageTypeId.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalPatient &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='pacientes:'
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
      {
        modalTheth &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Dientes:'
          opendrawer={modalTheth}
          handleDrawer={handleModalTheth}
        >
          <ThethTable
            stateSelect={true}
            itemSelect={(v) => {
              if (thethIds.map((e: ThethModel) => e.id).includes(v.id)) {
                onValueChange('thethIds', [...thethIds.filter((e: ThethModel) => e.id != v.id)])
              } else {
                onValueChange('thethIds', [...thethIds, v])
              }
            }}
            items={thethIds.map((e: ThethModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Tratamiento' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={stageTypeId != null ? 'Etapa' : ''}
                  title={stageTypeId != null ? stageTypeId.name : 'Etapa'}
                  onPressed={() => handleModalStageType(true)}
                  error={!!stageTypeIdValid && formSubmitted}
                  helperText={formSubmitted ? stageTypeIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={patientId != null ? 'Paciente' : ''}
                  title={patientId != null ? patientId.user.name : 'Paciente'}
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
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={thethIds != null ? '' : 'Dientes'}
                  title={'Dientes'}
                  onPressed={() => handleModalTheth(true)}
                  error={!!thethIdsValid && formSubmitted}
                  helperText={formSubmitted ? thethIdsValid : ''}
                  items={thethIds.map((e: ThethModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('thethIds', [...thethIds.filter((e: ThethModel) => e.id != v)])}
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
