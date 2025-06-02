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

const pre_tax = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000];
const post_tax_array = post_tax();

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