import { Line } from "react-chartjs-2";

const revenue = [
  { name: "Monday", gain: 1000000 },
  { name: "Tuesday", gain: 10000000 },
  { name: "Wednesday", gain: 1500000 },
  { name: "Thursday", gain: 3000000 },
  { name: "Friday", gain: 6000000 },
  { name: "Sarturday", gain: 700000 },
  { name: "Sunday", gain: 2100000 },
];

export function BusinessChart() {
  return (
    <div>
      <Line
        data={{
          labels: revenue.map((data) => data.name),
          datasets: [
            {
              label: "Average Check Size (USD)",
              data: revenue.map((data) => data.gain),
              borderColor: "rgba(128, 0, 128, 1)", // Purple line color
              pointBackgroundColor: "rgba(128, 0, 128, 1)", // Points color
              borderWidth: 1,
              fill: true, // Enable the fill under the line
              tension: 0.4, // Smoother line
              backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  return null;
                }
                const gradient = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  chartArea.bottom
                );
                gradient.addColorStop(0, "rgba(128, 0, 128, 0.3)"); // Top gradient color
                gradient.addColorStop(1, "rgba(128, 0, 128, 0)"); // Bottom gradient (transparent)
                return gradient;
              },
              pointRadius: 5,
              pointHoverRadius: 8,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
