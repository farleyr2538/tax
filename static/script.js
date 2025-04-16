console.log("script.js running...")

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
    
    console.log("income: " + income);

    const income_tax_due = calculateIncomeTax(income).toFixed(2);
    const ni_due = calculateNI(income).toFixed(2);
    income_tax.innerHTML = "Income Tax: £" + income_tax_due;
    ni.innerHTML = "NI: £" + ni_due;
    const total_tax_due = parseFloat(income_tax_due + ni_due).toFixed(2);
    total_tax.innerHTML = "Total Tax: £" + total_tax_due;
    const take_home_pay = income - total_tax_due;
    net_income.innerHTML = "Take home pay: £" + take_home_pay.toFixed(2);
}

document.getElementById("submit").addEventListener('click', getIncome);
const income_tax = document.getElementById("income_tax");
const ni = document.getElementById("ni");
const total_tax = document.getElementById("total_tax");
const net_income = document.getElementById("net_income");


