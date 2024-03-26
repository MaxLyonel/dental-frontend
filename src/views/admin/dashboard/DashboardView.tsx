import { Box, Container, Grid } from "@mui/material"
import { OverviewBars, OverviewCard, OverviewCircle } from "."
import { useEffect } from "react";
import { Event, Person2Outlined } from "@mui/icons-material";
import { useReportStore } from "@/hooks";

export const DashboardView = () => {
  const { dashboard, getDashboard } = useReportStore();
  useEffect(() => {
    getDashboard();
  }, [])


  return (
    <>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl">
          {
            dashboard &&
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <OverviewCard
                  sx={{ height: '100%' }}
                  value={dashboard.countTreatments}
                  title="Eventos"
                >
                  <Event />
                </OverviewCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <OverviewCard
                  sx={{ height: '100%' }}
                  value={dashboard.countPatients}
                  title="Ponentes"
                >
                  <Person2Outlined />
                </OverviewCard>
              </Grid>
              <Grid item xs={12} sm={9}>
                <OverviewBars />
              </Grid>
              <Grid item xs={12} sm={3}>
                <OverviewCircle />
              </Grid>
            </Grid>
          }
        </Container>
      </Box>
    </>
  )
}
