export function calculateIncomeTax(income) {
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

export function calculateNI(income) {
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