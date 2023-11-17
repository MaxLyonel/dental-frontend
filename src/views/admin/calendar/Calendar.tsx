import { getMessagesES, localizer } from "@/helpers";

import { useTreatmentStore } from "@/hooks";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import { Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TreatmentModel } from "@/models";
import { CalendarEvent, TreatmentDialog } from ".";


interface calendarProps {
  screenHeight: number;
}
export const CalendarComponent = (props: calendarProps) => {
  const {
    screenHeight,
  } = props;
  const [itemSelect, setitemSelect] = useState<TreatmentModel>()
  const [openDialog, setopenDialog] = useState(false);
  const { treatments = [], getTreatments } = useTreatmentStore()


  useEffect(() => {
    getTreatments();
  }, [])
  const onSelect = (treatment: TreatmentModel) => {
    setitemSelect(treatment)
    handleDialog(true);
  }
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);
  // .filter((treatment: TreatmentModel) => treatment.state)
  return (
    <>
      <Paper sx={{ p: .5, borderRadius: '10px' }}>
        <Calendar
          culture='es'
          localizer={localizer}
          events={[...treatments.map(((treatment: TreatmentModel) =>
          ({
            title: treatment.description,
            start: new Date(`${treatment.date}`),
            end: new Date((new Date(`${treatment.date}`)).getTime() + 30 * 60 * 1000),
            ...treatment
          })))
          ]}
          style={{ height: `${screenHeight - 150}px`, cursor: 'pointer' }}
          messages={getMessagesES()}
          eventPropGetter={() => {
            return {
              style: {
                backgroundColor: '#a7e8d8',
                color: '#000',
                opacity: 0.6,
                display: 'block',
                fontSize: '0.9rem'
              },
            };
          }}
          components={{
            event: CalendarEvent
          }}
          onSelectEvent={onSelect}
        />
      </Paper>
      {
        itemSelect &&
        <TreatmentDialog
          open={openDialog}
          handleClose={() => handleDialog(false)}
          treatmentId={itemSelect.id}
        />
      }
    </>
  )
}
