import { TreatmentModel } from "@/models";
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"

interface dialogProps {
  open: boolean;
  handleClose: () => void;
  item: TreatmentModel;
}
export const TreatmentDialog = (props: dialogProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  return (
    <Dialog
      maxWidth="xl"
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
            <DialogTitle >
              {item.description}
            </DialogTitle>
            <Typography
              variant="subtitle1"
            >
              {item.description}
            </Typography>
          </Grid>
        </Grid>

      </DialogContent>
    </Dialog>
  )
}