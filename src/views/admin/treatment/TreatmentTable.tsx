import { PatientModel, PermissionModel, ThethModel, TreatmentModel } from "@/models";
import { Collapse, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import esES from 'date-fns/locale/es';
import { format } from "date-fns";
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import { useAuthStore, useTreatmentStore } from "@/hooks";
import { useCallback, useState } from "react";
import { CreateTreatment } from ".";
import { SeverityPill } from "@/components";

interface tableProps {
  patient: PatientModel;
  open: boolean;
  treatments: TreatmentModel[];
  onViewTheths?: (values: ThethModel[]) => void;
}

export const TreatmentTable = (props: tableProps) => {
  const {
    patient,
    open,
    treatments,
    onViewTheths,
  } = props;
  const { roleUser } = useAuthStore();
  const { deleteTreatment } = useTreatmentStore();
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<TreatmentModel>();
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);

  return (
    <>
      <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" >
            <Typography variant="h6">Eventos</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Monto total</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Souvenires</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell>{treatment.description}</TableCell>
                    <TableCell>{`${format(new Date(treatment.date), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}</TableCell>
                    <TableCell>{treatment.totalAmount}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => onViewTheths!(treatment.thethIds)}
                      >
                        <RemoveRedEyeOutlined color="info" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={treatment.state !== "cancelado" ? 'success' : 'error'}>
                        {treatment.state}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          onClick={() => {
                            setItemEdit(treatment)
                            handleDialog(true)
                          }}
                          disabled={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "editar evento")}
                        >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteTreatment(treatment.id)}
                          disabled={treatment.state == "cancelado" || !roleUser.permissions.find((permission: PermissionModel) => permission.name === "eliminar evento")}
                        >
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      {
        openDialog &&
        <CreateTreatment
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={{ ...itemEdit, stageTypeId: itemEdit!.stageType, patientId: patient, treatmentId: itemEdit!.id }}
        />
      }
    </>
  )
}
