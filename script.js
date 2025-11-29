// Database with ZAID and half-life in years
const zaidData = {
  1003: 12.312,
  6014: 5700,
  27060: 5.2710,
  55137: 30.018,
  56133: 10.539,
  95241: 432.6,
  63152: 13.522,
  55134: 2.0644,
  53131: 0.0219670674,
  27057: 0.744163738,
  88226: 1600,
  86222: 0.0104675747,
  38090: 28.8,
  92233: 159200,
  96244: 18.11,
  11022: 2.6029,
  92238: 4468000000,
  92234: 245500,
  94239: 24100,
  48109: 1.26464029,
  58139: 0.376848569,
  25054: 0.854583619,
  50113: 0.315105977,
  39088: 0.291932313,
  80203: 0.127570144,
  26055: 2.747,
  38085: 0.177553416
};

function radioactiveDecay(initialAmount, halfLife, time) {
  const lambda = Math.log(2) / halfLife;
  const remainingAmount = initialAmount * Math.exp(-lambda * time);
  return remainingAmount;
}

function timeCalc(day0, month0, year0, day1, month1, year1) {
  let ndays = 0;
  let dpermonth = new Array(12);

  dpermonth[0] = 31;
  if (4 * Math.floor(year0 / 4) != year0) {
    dpermonth[1] = 28;
  } else if (4 * Math.floor(year0 / 4) == year0) {
    dpermonth[1] = 29;
  }
  dpermonth[2] = 31;
  dpermonth[3] = 30;
  dpermonth[4] = 31;
  dpermonth[5] = 30;
  dpermonth[6] = 31;
  dpermonth[7] = 31;
  dpermonth[8] = 30;
  dpermonth[9] = 31;
  dpermonth[10] = 30;
  dpermonth[11] = 31;

  if (year1 > year0) {
    if (month0 == 1) {
      ndays = 31 - day0 + 1;
    }
    if (month0 == 2) {
      if (4 * Math.floor(year0 / 4) != year0) {
        ndays = 28 - day0 + 1;
      } else if (4 * Math.floor(year0 / 4) == year0) {
        ndays = 29 - day0 + 1;
      }
    }
    if (month0 == 3) {
      ndays = 31 - day0 + 1;
    }
    if (month0 == 4) {
      ndays = 30 - day0 + 1;
    }
    if (month0 == 5) {
      ndays = 31 - day0 + 1;
    }
    if (month0 == 6) {
      ndays = 30 - day0 + 1;
    }
    if (month0 == 7) {
      ndays = 31 - day0 + 1;
    }
    if (month0 == 8) {
      ndays = 31 - day0 + 1;
    }
    if (month0 == 9) {
      ndays = 30 - day0 + 1;
    }
    if (month0 == 10) {
      ndays = 31 - day0 + 1;
    }
    if (month0 == 11) {
      ndays = 30 - day0 + 1;
    }
    if (month0 == 12) {
      ndays = 31 - day0 + 1;
    }

    for (let i = month0 + 1; i <= 12; i++) {
      ndays += dpermonth[i - 1];
    }

    for (let i = year0 + 1; i < year1; i++) {
      if (4 * Math.floor(i / 4) != i) {
        ndays += 365;
      } else if (4 * Math.floor(i / 4) == i) {
        ndays += 366;
      }
    }

    ndays += day1 - 1;

    if (4 * Math.floor(year1 / 4) != year1) {
      dpermonth[1] = 28;
    } else if (4 * Math.floor(year1 / 4) == year1) {
      dpermonth[1] = 29;
    }

    for (let i = month1 - 1; i > 0; i--) {
      ndays += dpermonth[i - 1];
    }
  }

  if (year1 == year0) {
    if (month1 == month0) {
      ndays = day1 - day0;
    } else if (month1 != month0) {
      if (month0 == 1) {
        ndays = 31 - day0 + 1;
      }
      if (month0 == 2) {
        if (4 * Math.floor(year0 / 4) != year0) {
          ndays = 28 - day0 + 1;
        } else if (4 * Math.floor(year0 / 4) == year0) {
          ndays = 29 - day0 + 1;
        }
      }
      if (month0 == 3) {
        ndays = 31 - day0 + 1;
      }
      if (month0 == 4) {
        ndays = 30 - day0 + 1;
      }
      if (month0 == 5) {
        ndays = 31 - day0 + 1;
      }
      if (month0 == 6) {
        ndays = 30 - day0 + 1;
      }
      if (month0 == 7) {
        ndays = 31 - day0 + 1;
      }
      if (month0 == 8) {
        ndays = 31 - day0 + 1;
      }
      if (month0 == 9) {
        ndays = 30 - day0 + 1;
      }
      if (month0 == 10) {
        ndays = 31 - day0 + 1;
      }
      if (month0 == 11) {
        ndays = 30 - day0 + 1;
      }
      if (month0 == 12) {
        ndays = 31 - day0 + 1;
      }
    }
    for (let i = month0 + 1; i <= month1; i++) {
      if (i < month1) {
        ndays += dpermonth[i - 1];
      } else if (i == month1) {
        ndays += day1 - 1;
      }
    }
  }

  return ndays;
}

function calculate() {
  const zaid = parseInt(document.getElementById('zaid').value);
  const ceDate = new Date(document.getElementById('ceDate').value);
  const measureDate = new Date(document.getElementById('measureDate').value);
  const A0 = parseFloat(document.getElementById('A0').value);

  const resultsDiv = document.getElementById('results');
  const halfLifeResult = document.getElementById('halfLifeResult');
  const daysResult = document.getElementById('daysResult');
  const activityResult = document.getElementById('activityResult');

  if (!zaid || !ceDate || !measureDate || !A0) {
    alert('Vă rugăm să completați toate câmpurile!');
    return;
  }

  const halfLifeYears = zaidData[zaid];
  if (!halfLifeYears) {
    resultsDiv.classList.add('show');
    halfLifeResult.innerHTML = '<span style="color: #f44;">ZAID nu a fost găsit în baza de date!</span>';
    daysResult.textContent = '-';
    activityResult.textContent = '-';
    return;
  }

  const halfLifeDays = halfLifeYears * 365.2422;

  const day0 = ceDate.getDate();
  const month0 = ceDate.getMonth() + 1;
  const year0 = ceDate.getFullYear();

  const day1 = measureDate.getDate();
  const month1 = measureDate.getMonth() + 1;
  const year1 = measureDate.getFullYear();

  const days = timeCalc(day0, month0, year0, day1, month1, year1);
  const activity = radioactiveDecay(A0, halfLifeDays, days);

  resultsDiv.classList.add('show');
  halfLifeResult.textContent = `T1/2 = ${halfLifeYears} ani (${halfLifeDays.toFixed(4)} zile)`;
  daysResult.textContent = `${days} zile`;
  activityResult.textContent = `${activity}`;
}

// Set today's date as default
document.getElementById('measureDate').valueAsDate = new Date();
