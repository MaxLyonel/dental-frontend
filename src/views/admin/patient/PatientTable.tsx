import { ComponentSearch, ComponentTablePagination, ShowTable } from "@/components";
import { usePatientStore } from "@/hooks";
import { AdministratorModel, PatientModel, ThethModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { TreatmentTable } from ".";

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
  const [patientList, setPatientList] = useState<PatientModel[]>([]);
  const [query, setQuery] = useState<string>('');

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [opendrawer, setOpendrawer] = useState<any>({ state: false, items: [] });
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
    setPatientList(newList)
  }, [patients, page, rowsPerPage, query])

  const handleTheths = useCallback((state: boolean, items: ThethModel[]) => {
    setOpendrawer({ state, items })
  }, []);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Paciente"
        search={setQuery}
      />
      <TableContainer>
        <Table size="small">
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
            {patientList.map((patient: PatientModel) => {
              const isSelected = items.includes(patient.id);
              return (
                <React.Fragment key={patient.id} >
                  <TableRow >
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
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenIndex(openIndex == patient.id ? null : patient.id)}
                      >
                        {openIndex == patient.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                      </IconButton>
                    </TableCell>
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
                  <TreatmentTable
                    open={openIndex == patient.id}
                    treatments={patient.treatmentsIds}
                    onViewTheths={(items) => handleTheths(true, items)}
                  />
                </React.Fragment>
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
      {
        <ShowTable
          open={opendrawer.state}
          handleClose={() => handleTheths(false, [])}
          title="Dientes"
          headers={['#', 'Nombre', 'Modulo']}
          data={opendrawer.items}
        />
      }
    </Stack >
  );
}
