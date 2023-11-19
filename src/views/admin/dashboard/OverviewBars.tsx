import {
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
} from '@mui/material';
import { RefreshOutlined } from '@mui/icons-material';
import { Chart } from '@/components';
import { useReportStore } from '@/hooks';

export const OverviewBars = () => {

  const { dashboard } = useReportStore();
  return (
    <Card>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <RefreshOutlined />
              </SvgIcon>
            )}
          >
            Actualizar
          </Button>
        )}
        title="Cant. Tratamientos VS. Tiempo"
      />
      <CardContent>
        <Chart
          height={350}
          options={{
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: dashboard.treatmentsLineTime.months
            }
          }}
          series={[
            {
              name: "tratamientos",
              data: dashboard.treatmentsLineTime.treatmentCounts
            }
          ]}
          type="line"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};
