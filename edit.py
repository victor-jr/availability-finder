from datetime import date, datetime, timedelta

def findAvailability() -> list:
    tdate = date(2024, 4, 2)
    arrMaster = [
        [datetime(2024, 4, 2, 8, 0), 3], 
        [datetime(2024, 4, 2, 9, 00), 4], 
        [datetime(2024, 4, 2, 9, 30), 1], 
        [datetime(2024, 4, 2, 10, 00), 3], 
        [datetime(2024, 4, 2, 10, 30), 2], 
        [datetime(2024, 4, 2, 10, 30), 4] 
        # [datetime(2024, 4, 2, 11, 00), 1], 
        # [datetime(2024, 4, 2, 12, 00), 2], 
        # [datetime(2024, 4, 2, 13, 30), 3], 
        # [datetime(2024, 4, 2, 13, 30), 3], 
        # [datetime(2024, 4, 2, 14, 30), 4], 
        # [datetime(2024, 4, 2, 14, 30), 4], 
        # [datetime(2024, 4, 2, 15, 15), 1], 
        # [datetime(2024, 4, 2, 15, 45), 3],
        # [datetime(2024, 4, 2, 16, 15), 2],
        # [datetime(2024, 4, 2, 16, 15), 4]
    ]
    chkEndTime = False
    arrToPrintDay = list
    tStart = 0
    tEnd = 0
    mapAllAvail = dict
    arrToPrintDay = list
    a = 0
    b = 0

    for input in arrMaster:
        match input[1]:
            case 1:
                a += 1
                if a == b:
                    tStart = input[0]
            case 2:
                a -= 1
                if (a == 0) and (b == 0):
                    halfHourSeconds = 1800
                    tEnd = input[0]
                    dateDelta = tEnd - tStart
                    dateDeltaHalfHours = dateDelta.seconds / halfHourSeconds
                    if dateDeltaHalfHours > 0:
                        for halfBlock in dateDeltaHalfHours:
                            hourIncrement = halfBlock * .5
                            timeStart = tStart + timedelta(hours=hourIncrement)
                            arrToPrintDay.append(str(timeStart.time()))

    mapAllAvail[tdate] = arrToPrintDay

                        
