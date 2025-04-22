console.log("script.js running...")

let gross_income = 0;
let take_home = 0;
let income_tax_due = 0;
let ni_due = 0;
let total_income_tax = 0;
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

    total_tax.innerHTML = "Total Income Tax: £" + total_income_tax.toLocaleString();
    overall_tax_rate_element.innerHTML = "Overall Tax Rate: " + overall_tax_rate.toLocaleString() + "%";
    
    if (pieChart !== null) {
        console.log("updating chart...")
        pieChart.data.datasets.forEach((dataset) => {
            dataset.data = [take_home, income_tax_due, ni_due];
        });
        pieChart.update()
    } else {
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
        
        const ctx = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(ctx, config);
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
    vat_month_element.innerHTML = "£" + total_vat.toLocaleString() + " VAT per month";
    const vat_year_element = document.getElementById("vat_year");
    vat_year_element.innerHTML = "£" + (total_vat * 12).toLocaleString() + " VAT per year";

    const vat_and_income = total_vat + total_income_tax;
    document.getElementById("income_and_vat").innerHTML = "Total tax (income tax + VAT): £" + vat_and_income.toLocaleString();
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
      label: 'Spending breakdown',
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
          position: 'top'
        },
        title: {
          display: true,
          text: 'Spending breakdown'
        }
      }
    }
  };
  const spending_chart = document.getElementById('spendingChart').getContext('2d');
  spending_chart = new Chart(spending_chart, spending_config);
}

document.getElementById("submit_income").addEventListener('click', getIncome);
document.getElementById("submit_vat").addEventListener('click', getVAT);

const total_tax = document.getElementById("total_tax");
const overall_tax_rate_element = document.getElementById("overall_tax_rate");

