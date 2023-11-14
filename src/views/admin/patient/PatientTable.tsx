import { ComponentSearch, ComponentTablePagination } from "@/components";
import { usePatientStore } from "@/hooks";
import { AdministratorModel, PatientModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (patient: PatientModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (patient: PatientModel) => void;
  items?: any[];
}

export const PatientTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { patients = [], getPatients, deletePatient } = usePatientStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [userList, setUserList] = useState<PatientModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getPatients()
  }, []);

  useEffect(() => {
    const filtered = patients.filter((e: AdministratorModel) =>
      e.user.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : patients,
      page,
      rowsPerPage
    );
    setUserList(newList)
  }, [patients, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Paciente"
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
              <TableCell sx={{ fontWeight: 'bold' }}>Alergias</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Sangre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Historial Medico</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((patient: PatientModel) => {
              const isSelected = items.includes(patient.id);
              return (
                <TableRow key={patient.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(patient)}
                      />
                    </TableCell>
                  }
                  <TableCell>{patient.user.identityCard}</TableCell>
                  <TableCell>{patient.user.name}</TableCell>
                  <TableCell>{patient.user.lastName}</TableCell>
                  <TableCell>{patient.user.phone}</TableCell>
                  <TableCell>{patient.allergies}</TableCell>
                  <TableCell>{patient.bloodType}</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(patient)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deletePatient(patient.id)} >
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
        total={patients.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
