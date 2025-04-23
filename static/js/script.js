console.log("script.js running...")

import { calculateIncomeTax, calculateNI } from "./helpers.js";

let gross_income = 0;
let take_home = 0;
let income_tax_due = 0;
let ni_due = 0;
let total_income_tax = 0;
let overall_tax_rate = 0;

let pieChart = null;

function getIncome(event) {
    //pieChart.setAttribute('height', '100');

    event.preventDefault(); // Prevent the form from submitting
    const income_element = document.getElementById("income");
    const income_str = income_element.value;
    const income = parseFloat(income_str);
    gross_income = income;
    
    // calculate tax
    income_tax_due = calculateIncomeTax(income);
    ni_due = calculateNI(income);
    total_income_tax = income_tax_due + ni_due;
    take_home = (gross_income - total_income_tax);
    overall_tax_rate = ((total_income_tax / gross_income) * 100).toFixed(1);

    total_tax.innerHTML = "£" + total_income_tax.toLocaleString();
    overall_tax_rate_element.innerHTML = overall_tax_rate.toLocaleString() + "%";
    
    if (pieChart !== null) {
      // update chart
        console.log("updating chart...")
        pieChart.data.datasets.forEach((dataset) => {
            dataset.data = [take_home, income_tax_due, ni_due];
        });
        pieChart.update()
    } else {
      // create chart
        const tax_data = {
          labels: ['take-home pay', 'income tax', 'national insurance'],
          datasets: [
            {
              label: 'amount',
              data: [take_home, income_tax_due, ni_due],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
            }
          ]
        };
        
        const config = {
          type: 'pie',
          data: tax_data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: false,
                text: 'Tax breakdown'
              }
            }
          }
        };
        
        const ctx = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(ctx, config);

        const size_multiplier = overall_tax_rate * 6;

        document.getElementById('tax_data_container').style.display = 'flex';
        document.querySelectorAll('.info_bubble').forEach((bubble) => {
            bubble.style.transform = `scale(0.5)`;
            requestAnimationFrame(() => {
                bubble.style.transform = `scale(1)`;
            });
        });
        
    }

}

function getVAT(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    const groceries = parseFloat(document.getElementById("groceries").value);
    const energy = parseFloat(document.getElementById("energy").value);
    const petrol = parseFloat(document.getElementById("petrol").value);
    const month = parseFloat(document.getElementById("month").value);

    const vat_energy = energy - (energy / 1.05);
    const vat_petrol = petrol * 0.52;
    const payable_at_20 = month - groceries - petrol;
    const vat_other = payable_at_20 - (payable_at_20 / 1.20);

    const total_vat = vat_energy + vat_petrol + vat_other;
    console.log("Total VAT: £" + total_vat.toLocaleString());

    // insert to HTML
    const vat_header_element = document.getElementById("vat_header");
    vat_header_element.innerHTML = "You pay approximately...";

    const vat_month_element = document.getElementById("vat_month");
    const vat_per_month = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(total_vat)
    vat_month_element.innerHTML = vat_per_month + " per month";

    const vat_per_year = total_vat * 12;
    const vat_per_year_formatted = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(vat_per_year);
    const vat_year_element = document.getElementById("vat_year");
    vat_year_element.innerHTML = vat_per_year_formatted + " per year";

    const vat_and_income = vat_per_year + total_income_tax;
    const vat_and_income_formatted = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(vat_and_income);
    document.getElementById("income_and_vat").innerHTML = "Total Annual Tax: " + vat_and_income_formatted;
    document.getElementById('income_and_vat_note').innerHTML = "(income tax, national insurance, and VAT combined)";
    getSpending(vat_and_income);
}

function getSpending(tax) {
  const spending_data_22_23 = {
    "health" : (0.183 * tax),
    "social security (pensioners)" : (0.122 * tax),
    "social security (working age and children)" : (0.102 * tax),
    "education" : (0.091 * tax),
    "net debt interest" : (0.084 * tax),
    "defence" : (0.048 * tax),
    "transport" : (0.038 * tax),
    "public order and safety" : (0.038 * tax),
    "long-term care" : (0.024 * tax),
    "housing and community amenities" : (0.015 * tax),
    "overseas aid" : (0.011 * tax),
    "other" : (0.24 * tax)
  }
  const spending_data = {
    labels: Object.keys(spending_data_22_23),
    datasets: [{
      label: 'tax',
      data: Object.values(spending_data_22_23),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(201, 203, 207)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(201, 203, 207)',
      ]
    }]
  };
  const spending_config = {
    type: 'pie',
    data: spending_data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Spending breakdown'
        }
      }
    }
  };
  let spending_chart = document.getElementById('spendingChart').getContext('2d');
  spending_chart = new Chart(spending_chart, spending_config);
}

document.getElementById("submit_income").addEventListener('click', getIncome);
document.getElementById("submit_vat").addEventListener('click', getVAT);

const total_tax = document.getElementById("total_tax");
const overall_tax_rate_element = document.getElementById("overall_tax_rate");