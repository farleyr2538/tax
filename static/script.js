console.log("script.js running...")

function getIncome(event) {
    event.preventDefault(); // Prevent the form from submitting
    const income_element = document.getElementById("income");
    const income_str = income_element.value;
    const income = parseFloat(income_str);
    
    console.log("income: " + income);
}

document.getElementById("submit").addEventListener('click', getIncome);

function calculateIncomeTax(income) {
    const taxable_income = income - 12570;
    return taxable_income * 0.2;
}

function calculateNI(income) {
    const taxable_income = income - 12570;
    return taxable_income * 0.12;
}