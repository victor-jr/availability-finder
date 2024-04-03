function findAvailability() {
  let tDate = new Date(2024, 3, 2);
  let arrMaster = [
    [new Date('Tue Apr 02 08:00:00 GMT-05:00 2024'), 3], 
    [new Date('Tue Apr 02 09:00:00 GMT-05:00 2024'), 4], 
    [new Date('Tue Apr 02 09:30:00 GMT-05:00 2024'), 1], 
    [new Date('Tue Apr 02 10:00:00 GMT-05:00 2024'), 3], 
    [new Date('Tue Apr 02 10:30:00 GMT-05:00 2024'), 2], 
    [new Date('Tue Apr 02 10:30:00 GMT-05:00 2024'), 4], 
    [new Date('Tue Apr 02 11:00:00 GMT-05:00 2024'), 1], 
    [new Date('Tue Apr 02 12:00:00 GMT-05:00 2024'), 2], 
    [new Date('Tue Apr 02 13:30:00 GMT-05:00 2024'), 3], 
    [new Date('Tue Apr 02 13:30:00 GMT-05:00 2024'), 3], 
    [new Date('Tue Apr 02 14:30:00 GMT-05:00 2024'), 4], 
    [new Date('Tue Apr 02 14:30:00 GMT-05:00 2024'), 4], 
    [new Date('Tue Apr 02 15:15:00 GMT-05:00 2024'), 1], 
    [new Date('Tue Apr 02 15:45:00 GMT-05:00 2024'), 3], 
    [new Date('Tue Apr 02 16:15:00 GMT-05:00 2024'), 2], 
    [new Date('Tue Apr 02 16:15:00 GMT-05:00 2024'), 4]
  ];
  let chkEndTime = false;
  let tStart;
  let tEnd;
  let mapAllAvail = new Map();
  let arrToPrintDay = [];
  let a;
  let b;

  /* Key
  1 = Start available block
  2 = End available block
  3 = Start busy block
  4 = End busy block
  */
  //Iterate through to generate available 30-minute f/u blocks; 1800000 ms = 30 min
  for (let z = 0; z < arrMaster.length; z++) {
    switch (arrMaster[z][1]) {
      case 1:
        a++;
        if (b == 0) { 
          tStart = arrMaster[z][0] 
        }
        break;
      case 2:
        a--;
        if (a == 0 && b == 0) {
          tEnd = arrMaster[z][0];
          let numInt = Math.floor((tEnd - tStart) / 1800000);
          if (numInt >= 1) {
            for (let i = 0; i < numInt; i++) {
              tEnd = new Date(tStart.getTime() + 1800000);
              if (chkEndTime) {
                arrToPrintDay[p] = [timeOnly.format(tStart).substring(0, timeOnly.format(tStart).length - 2) + 'to ' + timeOnly.format(tEnd)];
              } else { 
                arrToPrintDay[p] = [timeOnly.format(tStart)] 
              }
              //arrToPrintDay[p] = Array(timeOnly.format(tStart), timeOnly.format(tEnd)); 
              tStart = tEnd;
              p++;
            }
          }
        }
        break;
      case 3:
        b++;
        if (b == 1 && a >= 1) {
          tEnd = arrMaster[z][0];
          let numInt = Math.floor((tEnd - tStart) / 1800000);
          if (numInt >= 1) {
            for (let i = 0; i < numInt; i++) {
              tEnd = new Date(tStart.getTime() + 1800000);
              if (chkEndTime) {
                arrToPrintDay[p] = [timeOnly.format(tStart).substring(0, timeOnly.format(tStart).length - 2) + 'to ' + timeOnly.format(tEnd)];
              } else { 
                arrToPrintDay[p] = [timeOnly.format(tStart)] 
              }
              tStart = tEnd;
              p++;
            }
          }
        }
        break;
      case 4:
        b--;
        if (b == 0 && a >= 1) {
          tStart = arrMaster[z][0];
        }
        break;
    }


  }
  //Put it in map
  mapAllAvail.set(tDate.toDateString(), arrToPrintDay);
}

function genDates(startDate, endDate) {
  let oneDayms = 86400000;
  let arrDates = [];

  for (let i = startDate.getTime(); i < endDate.getTime() + oneDayms; i = i + oneDayms) {
    let wkDay = new Date(i);
    if (wkDay.getDay() > 0 && wkDay.getDay() < 6) { 
      arrDates.push(wkDay); 
    }
  }
  return arrDates;
}
