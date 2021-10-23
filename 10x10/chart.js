var labels = [];
var data_state_visited = [];

var ctx = document.getElementById('myChart').getContext("2d")
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: "moves",
            borderColor: "#80b6f4",
            pointBorderColor: [],
            pointBackgroundColor: "#80b6f4",
            //pointHoverBackgroundColor: "#80b6f4",
            pointHoverBorderColor: "transparent",
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 5,
            pointRadius: 3,
            fill: true,
            borderWidth: 4,
            data: data_state_visited
        }],
    },
    options: {
        legend: {
            position: "bottom"
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
}],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
},
                ticks: {
                    padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
					autoSkip: true,
					maxTicksLimit: 5
                }
            }]
        }
    }
});

function addDataToChart(label, data_state_visited, color) {
    myChart.data.labels.push(label);
	myChart.data.datasets[0].pointBorderColor.push(color);
	
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data_state_visited);
    });
	
	if (labels.length > 100) removeDataToChart();
	
    myChart.update();
}

function removeDataToChart() {
	labels.reverse();
	myChart.data.labels.pop();
	labels.reverse();
	
	data_state_visited.reverse();
	myChart.data.datasets[0].data.pop();
	data_state_visited.reverse();
	
	myChart.data.datasets[0].pointBorderColor.reverse();
	myChart.data.datasets[0].pointBorderColor.pop();
	myChart.data.datasets[0].pointBorderColor.reverse();
}