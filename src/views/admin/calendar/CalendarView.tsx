import { ComponentButton } from "@/components"
import { Stack, SvgIcon } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { CalendarComponent, CreateTreatment } from ".";
import { Add } from "@mui/icons-material";
import { PatientModel } from "@/models";

export const CalendarView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<PatientModel | null>(null);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);


  return (
    <>
      <Stack
        direction="row"
        justifyContent="end"
      >
        <ComponentButton
          text="Nuevo tratamiento"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <CalendarComponent
        screenHeight={screenHeight}
      />
      {
        openDialog &&
        <CreateTreatment
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit!.user, patientId: itemEdit.id, ...itemEdit }}
        />
      }
    </>
  )
}
