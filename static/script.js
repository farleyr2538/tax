console.log("script.js running...")

let gross_income = 0;
let take_home = 0;
let income_tax_due = 0;
let ni_due = 0;
let total_tax_due = 0;
let overall_tax_rate = 0;

let pieChart = null;

function calculateIncomeTax(income) {

    let tax_due = 0;

    if (income > 12570 && income <= 50270) {
        let taxable_at_20 = income - 12570;
        tax_due += taxable_at_20 * 0.2;
    } else if (income > 50270 && income <= 125140) {
        let taxable_at_20 = 50270 - 12570;
        let taxable_at_40 = income - 50270;
        tax_due = (taxable_at_20 * 0.2) + (taxable_at_40 * 0.4);
    } else if (income > 125140) {
        let taxable_at_20 = 50270 - 12570;
        let taxable_at_40 = 125140 - 50270;
        let taxable_at_45 = income - 125140;
        tax_due = (taxable_at_20 * 0.2) + (taxable_at_40 * 0.4) + (taxable_at_45 * 0.45);
    }

    return tax_due
}

function calculateNI(income) {
    const weekly_income = income / 52
    let tax_due = 0
    if (weekly_income > 242 && weekly_income <= 967) {
        let taxable_at_8 = weekly_income - 242
        tax_due = taxable_at_8 * 0.08
    }
    if (weekly_income > 967) {
        let taxable_at_8 = 967 - 242
        let taxable_at_2 = weekly_income - 967
        tax_due = (taxable_at_2 * 0.02) + (taxable_at_8 * 0.08)
    }
    return tax_due * 52
}

function getIncome(event) {
    event.preventDefault(); // Prevent the form from submitting
    const income_element = document.getElementById("income");
    const income_str = income_element.value;
    const income = parseFloat(income_str);
    gross_income = income;
    
    // calculate tax
    income_tax_due = calculateIncomeTax(income);
    ni_due = calculateNI(income);
    total_tax_due = income_tax_due + ni_due;
    take_home = (gross_income - total_tax_due);
    overall_tax_rate = ((total_tax_due / gross_income) * 100);

    // log
    console.log("Gross Income: £" + gross_income.toLocaleString());
    console.log("Income Tax: £" + income_tax_due.toLocaleString());
    console.log("NI: £" + ni_due.toLocaleString());
    console.log("Total Tax: £" + total_tax_due.toLocaleString());
    console.log("Take Home: £" + take_home.toLocaleString());
    console.log("Overall Tax Rate: " + overall_tax_rate.toFixed(2) + "%");

    // insert to HTML
    income_tax.innerHTML = "Income Tax: £" + income_tax_due.toLocaleString();
    ni.innerHTML = "NI: £" + ni_due.toLocaleString();
    total_tax.innerHTML = "Total Tax: £" + total_tax_due.toLocaleString();
    net_income.innerHTML = "Take home pay: £" + take_home.toLocaleString();
    overall_tax_rate_element.innerHTML = "Overall Tax Rate: " + overall_tax_rate.toLocaleString() + "%";

    const data = {
        labels: ['take-home', 'income tax', 'national insurance'],
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
        data: data,
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: 'Tax breakdown'
              }
            }
          }
      };

    
    if (pieChart !== null) {
        console.log("updating chart...")
        pieChart.data.datasets.forEach((dataset) => {
            dataset.data = [take_home, income_tax_due, ni_due];
        });
        pieChart.update()
    } else {
        const ctx = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(ctx, config);
    }
    
    
}

document.getElementById("submit").addEventListener('click', getIncome);

const income_tax = document.getElementById("income_tax");
const ni = document.getElementById("ni");
const total_tax = document.getElementById("total_tax");
const net_income = document.getElementById("net_income");
const overall_tax_rate_element = document.getElementById("overall_tax_rate");
