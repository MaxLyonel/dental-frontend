import { ComponentButton, ShowTable } from "@/components"
import { Stack, SvgIcon } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateRole, RoleTable } from ".";
import { Add } from "@mui/icons-material";
import { PermissionModel, RoleModel } from "@/models";
import { useAuthStore } from "@/hooks";

export const RoleView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<RoleModel | null>(null);
  const [opendrawer, setOpendrawer] = useState<any>({ state: false, items: [] });
  const { roleUser } = useAuthStore();
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  const handlePermisions = useCallback((state: boolean, items: PermissionModel[]) => {
    setOpendrawer({ state, items })
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="end"
      >
        <ComponentButton
          text="Nuevo rol"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          disable={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "crear roles")}
        />
      </Stack>
      <RoleTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
        onViewPermisions={(items) => handlePermisions(true, items)}
      />
      {
        openDialog &&
        <CreateRole
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
      {
        <ShowTable
          open={opendrawer.state}
          handleClose={() => handlePermisions(false, [])}
          title="Permisos"
          headers={['#', 'Nombre', 'Modulo']}
          data={opendrawer.items}
        />
      }
    </>
  )
}
