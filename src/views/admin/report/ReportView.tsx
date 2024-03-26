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
  } = useForm(formFields);
  // stage type
  const [dateRange] = useState([]);
  const { getReport } = useReportStore();


  return (
    <>
    </>
  )
}
