import { getMessagesES, localizer } from "@/helpers";

import { useTreatmentStore } from "@/hooks";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { TreatmentModel } from "@/models";
import { CalendarEvent } from ".";


interface calendarProps {
  screenHeight: number;
}
export const CalendarComponent = (props: calendarProps) => {
  const {
    screenHeight,
  } = props;
  const [lastView, setLastView] = useState('month');
  const [itemSelect, setitemSelect] = useState<any>()
  const { treatments = [], getTreatments } = useTreatmentStore()


  useEffect(() => {
    getTreatments();
  }, [])
  const onSelect = (event: any) => {
    setitemSelect(event)
    // handleDialog(true);
  }
  // .filter((treatment: TreatmentModel) => treatment.state)
  return (
    <Paper sx={{ p: .5, borderRadius: '10px' }}>
      <Calendar
        culture='es'
        localizer={localizer}
        events={[...treatments.map(((treatment: TreatmentModel) =>
        ({
          title: treatment.description,
          start: treatment.date,
          end: treatment.date,
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
        onView={setLastView}
      />
    </Paper>
  )
}
