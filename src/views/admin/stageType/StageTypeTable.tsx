import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useStageTypeStore } from "@/hooks";
import { PermissionModel, StageTypeModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  stateSelect?: boolean;
  itemSelect?: (stageType: StageTypeModel) => void;
  items?: any[];
  limitInit?: number;
}

export const StageTypeTable = (props: tableProps) => {
  const {
    stateSelect = false,
    itemSelect,
    items = [],
    limitInit = 10,
  } = props;

  const { stageTypes = [], getStageTypes } = useStageTypeStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [permisionList, setTypeUserList] = useState<PermissionModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getStageTypes()
  }, []);

  useEffect(() => {
    const filteredPermisions = stageTypes.filter((e: PermissionModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const defaultPermisionsList = applyPagination(
      query != '' ? filteredPermisions : stageTypes,
      page,
      rowsPerPage
    );
    setTypeUserList(defaultPermisionsList)
  }, [stageTypes, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Permiso"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permisionList.map((stageType: StageTypeModel) => {
              const isSelected = items.includes(stageType.id);
              return (
                <TableRow key={stageType.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(stageType)}
                      />
                    </TableCell>
                  }
                  <TableCell>{stageType.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={stageTypes.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
