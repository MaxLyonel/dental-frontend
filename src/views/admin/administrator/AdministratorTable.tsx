import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useAdministratorStore } from "@/hooks";
import { AdministratorModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    handleEdit?: (administrator: AdministratorModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (administrator: AdministratorModel) => void;
    items?: any[];
}

export const AdministratorTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { administrators = [], getAdministrators, deleteAdministrator } = useAdministratorStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [userList, setUserList] = useState<AdministratorModel[]>([]);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        getAdministrators()
    }, []);

    useEffect(() => {
        const filtered = administrators.filter((e: AdministratorModel) =>
            e.user.name.toLowerCase().includes(query.toLowerCase())
        );
        const newList = applyPagination(
            query != '' ? filtered : administrators,
            page,
            rowsPerPage
        );
        setUserList(newList)
    }, [administrators, page, rowsPerPage, query])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Administrador"
                search={setQuery}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Telefono</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((administrator: AdministratorModel) => {
                            const isSelected = items.includes(administrator.id);
                            return (
                                <TableRow key={administrator.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(administrator)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{administrator.user.identityCard}</TableCell>
                                    <TableCell>{administrator.user.name}</TableCell>
                                    <TableCell>{administrator.user.lastName}</TableCell>
                                    <TableCell>{administrator.user.phone}</TableCell>
                                    <TableCell>{administrator.role.name}</TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(administrator)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteAdministrator(administrator.id)} >
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={administrators.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
