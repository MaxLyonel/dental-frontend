export const CalendarEvent = ({ event }: any) => {

  const { title } = event;

  return (
    <>
      <strong>{title}</strong>
    </>
  )
}