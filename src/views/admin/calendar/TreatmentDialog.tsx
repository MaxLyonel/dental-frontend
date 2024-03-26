import { ComponentButton } from "@/components";
import { PaymentModel, PermissionModel, ThethModel, TreatmentModel } from "@/models";
import { Payment } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { FormPayment } from ".";
import { useAuthStore, useTreatmentStore } from "@/hooks";

interface dialogProps {
  open: boolean;
  handleClose: () => void;
  treatmentId: number;
}
export const TreatmentDialog = (props: dialogProps) => {
  const {
    open,
    handleClose,
    treatmentId,
  } = props;

  const { treatments = [] } = useTreatmentStore();
  const [modal, setModal] = useState(false);
  const [treatment, setTreatment] = useState<TreatmentModel>()
  const { roleUser } = useAuthStore();
  const handleModal = (value: boolean) => {
    setModal(value);
  };
  useEffect(() => {
    setTreatment(treatments.find((treatment: TreatmentModel) => treatment.id === treatmentId))
  }, [treatments, treatmentId])

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
      >
        {treatment && <DialogContent>
          <DialogTitle >
            {treatment.description}
          </DialogTitle>
          <Typography variant="subtitle1">
            {`Etapa: ${treatment.stageType.name}`}
          </Typography>
          <Typography variant="subtitle1">
            {`Paciente: ${treatment.patient.user.name} ${treatment.patient.user.lastName}`}
          </Typography>
          <Typography variant="subtitle1">
            {`Carnet: ${treatment.patient.user.identityCard}`}
          </Typography>
          <Typography variant="subtitle1">
            {`Contacto: ${treatment.patient.user.phone}`}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">
              {`Monto adeudado: ${treatment.amountDue} Bs`}
            </Typography>
            <ComponentButton
              text="Registrar pago"
              onClick={() => handleModal(true)}
              startIcon={<SvgIcon fontSize="small"><Payment /></SvgIcon>}
              disable={treatment.amountDue <= 0 && !roleUser.permissions.find((permission: PermissionModel) => permission.name === "efectuar pago")}
            />
          </Stack>
          {treatment.payments.length > 0 && <Table sx={{ minWidth: 350 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Descuento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {treatment.payments.map((payment: PaymentModel) => {
                return (
                  <TableRow key={payment.id} >
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.discount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>}
        </DialogContent>}
      </Dialog>
      {
        modal && treatment &&
        <FormPayment
          treatmentId={treatmentId}
          amountTotal={treatment.amountDue}
          open={modal}
          handleClose={() => handleModal(false)}
        />
      }
    </>
  )
}