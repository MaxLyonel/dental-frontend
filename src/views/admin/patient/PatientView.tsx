import { ComponentButton } from "@/components"
import { Stack, SvgIcon } from "@mui/material"
import { useCallback, useState } from "react";
import { CreatePatient, PatientTable } from ".";
import { Add } from "@mui/icons-material";
import { PatientModel, PermissionModel } from "@/models";
import { useAuthStore } from "@/hooks";


export const PatientView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<PatientModel | null>(null);
  const { roleUser } = useAuthStore();

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="end"
      >
        <ComponentButton
          text="Nuevo paciente"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          disable={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "crear pacientes")}
        />
      </Stack>
      <PatientTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <CreatePatient
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit!.user, patientId: itemEdit.id, ...itemEdit }}
        />
      }
    </>
  )
}
