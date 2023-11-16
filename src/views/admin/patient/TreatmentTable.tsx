import { ThethModel, TreatmentModel } from "@/models";
import { Collapse, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import esES from 'date-fns/locale/es';
import { format } from "date-fns";
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";

interface tableProps {
  open: boolean;
  treatments: TreatmentModel[];
  onViewTheths?: (values: ThethModel[]) => void;
}

export const TreatmentTable = (props: tableProps) => {
  const {
    open,
    treatments,
    onViewTheths,
  } = props;

  return (
    <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
        <Collapse in={open} timeout="auto" >
          <Typography variant="h6">Tratamientos</Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Monto total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Etapa</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Dientes</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {treatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell>{treatment.description}</TableCell>
                  <TableCell>{`${format(new Date(treatment.date), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}</TableCell>
                  <TableCell>{treatment.totalAmount}</TableCell>
                  <TableCell>{treatment.stageType.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => onViewTheths!(treatment.thethIds)}
                    >
                      <RemoveRedEyeOutlined color="info" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <IconButton onClick={() => { }} >
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton onClick={() => { }} >
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
  )
}
