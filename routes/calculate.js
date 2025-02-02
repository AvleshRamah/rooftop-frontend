const express = require('express');
const router = express.Router();

router.post('/calculate', (req, res) => {
    const {tnb_bill} = req.body;

    //declaring constants
    const TNB_TARRIF = 0.509;
    const SOLAR_COST_PER_KWP = 3000;
    const PEAK_SUN_HOURS = 3;
    const SYSTEM_EFFICIENCY = 0.8;
    const INTEREST_RATE = 0.05;
    const LOAN_TERM_YEARS = 10;
    const LOAN_MONTHS = LOAN_TERM_YEARS * 12;
    const TARGE_SAVINGS = 0.7;

    //System size calculations
    const monthlyEnergy = parseFloat(tnb_bill) / TNB_TARRIF;
    const dailyEnergy = monthlyEnergy / 30;
    const systemSize = Math.ceil(dailyEnergy / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY));

    //totalSystemCost
    const totalSystemCost = Math.ceil(systemSize * SOLAR_COST_PER_KWP);

    //loan installments calculation
    const monthlyPaymentTarget = parseFloat(tnb_bill) * TARGE_SAVINGS //70% of bill
    const monthlyInterestRate = INTEREST_RATE / 12;
    const estimatedInstallments = Math.ceil((totalSystemCost * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, LOAN_MONTHS)) / (Math.pow(1 + monthlyInterestRate, LOAN_MONTHS) - 1));


    //storing results in a session
    req.session.results = {systemSize , totalSystemCost, estimatedInstallments};

    res.redirect('/');
    
    //display results
    //res.render('index', {systemSize, totalSystemCost , estimatedInstallments});
});

module.exports = router;