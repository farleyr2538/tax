import { calculateIncomeTax, calculateNI } from "./helpers.js";

function post_tax() {
    const new_array = [];
    for (let i = 0; i < pre_tax.length; i++) {
        const income = pre_tax[i];
        const income_tax_due = calculateIncomeTax(income);
        const ni_due = calculateNI(income);
        const total_income_tax = income_tax_due + ni_due;
        const take_home = (income - total_income_tax);
        new_array.push(take_home);
    }
    return new_array;
}

const pre_tax = [];

// populate pre-tax
for (let x = 0; x <= 150000; x = x + 1000) {
    pre_tax.push(x)
}

const post_tax_array = post_tax();

// plotly implementation

var pre_tax_trace = {
    x : pre_tax,
    y : pre_tax,
    type : 'scatter'
}

var post_tax_trace = {
    x : pre_tax,
    y : post_tax_array,
    type : 'scatter'
}

var pre_post_tax = [pre_tax_trace, post_tax_trace];

const target_div = document.getElementById('graph_div');
Plotly.newPlot(target_div, pre_post_tax);

// chart.js implementation

const config = {
    type : 'line',
    data : {
        labels : pre_tax,
        datasets : [{
            label : 'Post-Tax Income',
            data : post_tax_array,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label : 'Pre-Tax Income',
            data : pre_tax,
            fill: false,
            borderColor: 'rgb(193, 170, 66)',
            tension: 0.1
        }]
    }
}

const ctx = document.getElementById('lineChart').getContext('2d');
new Chart(ctx, config);