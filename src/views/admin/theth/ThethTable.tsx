import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useThethStore } from "@/hooks";
import { PermissionModel, StageTypeModel, ThethModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  stateSelect?: boolean;
  itemSelect?: (stageType: StageTypeModel) => void;
  items?: any[];
  limitInit?: number;
}

export const ThethTable = (props: tableProps) => {
  const {
    stateSelect = false,
    itemSelect,
    items = [],
    limitInit = 10,
  } = props;

  const { theths = [], getTheths } = useThethStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [permisionList, setTypeUserList] = useState<ThethModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTheths()
  }, []);

  useEffect(() => {
    const filteredPermisions = theths.filter((e: PermissionModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const defaultPermisionsList = applyPagination(
      query != '' ? filteredPermisions : theths,
      page,
      rowsPerPage
    );
    setTypeUserList(defaultPermisionsList)
  }, [theths, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Diente"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permisionList.map((theth: ThethModel) => {
              const isSelected = items.includes(theth.id);
              return (
                <TableRow key={theth.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(theth)}
                      />
                    </TableCell>
                  }
                  <TableCell>{theth.name}</TableCell>
                  <TableCell>{theth.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={theths.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
