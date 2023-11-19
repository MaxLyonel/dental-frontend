import { ComponentDateRange, ComponentSelect, ModalSelectComponent } from "@/components";
import { Download } from "@mui/icons-material";
import { Button, Grid, Stack, SvgIcon } from "@mui/material";
import { ReportTable } from ".";
import { useForm, useReportStore } from "@/hooks";
import { StageTypeTable } from "../stageType";
import { useCallback, useEffect, useState } from "react";
import { StageTypeModel } from "@/models";

const formFields = {
  stageTypeIds: [],
}

export const ReportView = () => {

  const {
    stageTypeIds,
    onValueChange,
  } = useForm(formFields);
  // stage type
  const [modalStageType, setModalStageType] = useState(false);
  const [dateRange, onChangeDateRange] = useState([]);
  const { reportData = [], getReport, getReportXlsx } = useReportStore();
  const handleModalStageType = useCallback((value: boolean) => {
    setModalStageType(value);
  }, []);

  useEffect(() => {
    const where = (stageTypeIds.length > 0 || dateRange.length > 0) && {
      ...(stageTypeIds.length > 0 && { nameStageType: stageTypeIds.map((stageType: StageTypeModel) => stageType.id) }),
      ...(dateRange.length > 0 && { dateTreatment: dateRange }),
    };

    getReport(where || {});
  }, [stageTypeIds, dateRange]);

  const getDocument = () => {
    const where = (stageTypeIds.length > 0 || dateRange.length > 0) && {
      ...(stageTypeIds.length > 0 && { nameStageType: stageTypeIds.map((stageType: StageTypeModel) => stageType.id) }),
      ...(dateRange.length > 0 && { dateTreatment: dateRange }),
    };
    getReportXlsx(where || {})
  }

  return (
    <>
      {
        modalStageType &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Etapas:'
          opendrawer={modalStageType}
          handleDrawer={handleModalStageType}
        >
          <StageTypeTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (stageTypeIds.map((e: StageTypeModel) => e.id).includes(v.id)) {
                onValueChange('stageTypeIds', [...stageTypeIds.filter((e: StageTypeModel) => e.id != v.id)])
              } else {
                onValueChange('stageTypeIds', [...stageTypeIds, v])
              }
            }}
            items={stageTypeIds.map((e: StageTypeModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Stack direction="row" justifyContent="end">
        <Button
          onClick={() => getDocument()}
          startIcon={<SvgIcon fontSize="small"><Download /></SvgIcon>}
          variant="contained"
          disabled={reportData.length == 0}
        >
          Descargar
        </Button>
      </Stack>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
          <ComponentSelect
            label={stageTypeIds != null ? '' : 'Permisos'}
            title={'Etapa'}
            onPressed={() => handleModalStageType(true)}
            items={stageTypeIds.map((e: StageTypeModel) => ({ id: e.id, name: e.name }))}
            onRemove={(v) => onValueChange('stageTypeIds', [...stageTypeIds.filter((e: StageTypeModel) => e.id != v)])}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
          <ComponentDateRange
            value={dateRange}
            onChange={onChangeDateRange}
          />
        </Grid>
      </Grid>
      <ReportTable />
    </>
  )
}
