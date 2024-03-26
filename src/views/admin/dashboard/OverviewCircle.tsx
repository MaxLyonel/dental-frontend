import { Chart } from '@/components';
import { useReportStore } from '@/hooks';
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

const useChartOptions = (labels: string[]) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    colors: [
      theme.palette.success.main,
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

export const OverviewCircle = () => {
  const { dashboard } = useReportStore();
  const chartOptions = useChartOptions(dashboard.treatmentDonut.labels);
  const totalPercentage = dashboard.treatmentDonut.series.reduce((sum: number, percentage: number) => sum + percentage, 0);
  return (
    <Card>
      <CardHeader title="Tipos de eventos" />
      <CardContent>
        <Chart
          options={chartOptions}
          series={dashboard.treatmentDonut.series}
          type="donut"
        />
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ m: 0, p: 0 }}
        >
          {dashboard.treatmentDonut.labels.map((label: string, index: number) => {
            const percentage = totalPercentage !== 0 ? (dashboard.treatmentDonut.series[index] / totalPercentage) * 100 : 0;
            return (
              <Typography key={index}>
                {`${label}: ${percentage.toFixed(2)}%`}
              </Typography>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};
