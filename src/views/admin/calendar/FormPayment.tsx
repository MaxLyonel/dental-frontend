import { ComponentInput } from "@/components";
import { useForm, usePaymentStore } from "@/hooks";
import { FormPaymentValidations, FormPaymenttModel } from "@/models";
import { Button, Drawer, Grid, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

const formFields: FormPaymenttModel = {
  amount: 0,
  discount: 0,
  typeDiscount: 'monto'
}

const formValidations: FormPaymentValidations = {
  amount: [(value: any) => value != 0, 'Debe ingresar el monto de pago'],
}

interface drawerProps {
  treatmentId: number;
  amountTotal: number;
  open: boolean;
  handleClose: () => void;
}
export const FormPayment = (props: drawerProps) => {
  const {
    treatmentId,
    amountTotal,
    open,
    handleClose,
  } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { amount, discount, typeDiscount,
    onInputChange, isFormValid, onResetForm, onValueChange,
    amountValid, discountValid } = useForm(formFields, formValidations);
  const { postRegisterPayment } = usePaymentStore();
  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    postRegisterPayment(
      {
        treatmentId: treatmentId,
        amount: amount,
        discount: discount,
        typeDiscount: typeDiscount,
      });
    handleClose();
    onResetForm();
  }
  useEffect(() => {
    onValueChange('amount', amountTotal)
  }, [])
  return (
    <Drawer
      PaperProps={{
        style: {
          maxHeight: '75vh',
          bottom: 0,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          backgroundColor: '#f2f2f2',
        },
      }}
      sx={{ zIndex: 9999 }}
      anchor="bottom"
      open={open}
      onClose={() => handleClose()}
    >
      <Typography variant="h6">{`Registro de pago`}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Monto"
              name="amount"
              value={amount}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!amountValid && formSubmitted}
              helperText={formSubmitted ? amountValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Descuento"
              name="discount"
              value={discount}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!discountValid && formSubmitted}
              helperText={formSubmitted ? discountValid : ''}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button type="submit" >Registrar</Button>
        </Grid>
      </form>
    </Drawer>
  )
}
