import { ComponentButton } from "@/components"
import { Stack, SvgIcon } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateAdministrator, AdministratorTable } from ".";
import { Add } from "@mui/icons-material";
import { AdministratorModel, PermissionModel } from "@/models";
import { useAuthStore } from "@/hooks";

export const AdministratorView = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<AdministratorModel | null>(null);
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
                    text="Nuevo administrador"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                    disable={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "crear administradores")}
                />
            </Stack>
            <AdministratorTable
                handleEdit={(v) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <CreateAdministrator
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit == null ? null : { ...itemEdit!.user, roleId: itemEdit!.role, administratorId: itemEdit.id }}
                />
            }
        </>
    )
}
