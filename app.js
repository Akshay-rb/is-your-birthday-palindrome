function reverseString(str){
    // return reversedStr
    return str.split('').reverse().join('')
}

// console.log(reverseString('hello'))

function isPalindrome(str){
    var reverse = reverseString(str)
    // if(str === reverse)
    return str === reverse
}

var date = {
    day: 31,
    month:12,
    year:2020
}

function convertDateToString(date){
    var dateStr = {day: '', month:'', year : ''}
    if(date.day < 10){
        dateStr.day = '0'+ date.day
    }else{
        dateStr.day = date.day.toString()
    }

    if(date.month < 10){
        dateStr.month = '0'+ date.month
    }else{
        dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()

    return dateStr

}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy   = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy   = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd   = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy, mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeForAllDateFormats(date){
    var listofPalindromes = getAllDateFormats(date)

    var isPalindromeFlag = false

    for(let i =0; i< listofPalindromes.length;i++){
        if(isPalindrome(listofPalindromes[i])){
            isPalindromeFlag = true
            break
        }
    }

    return isPalindromeFlag
}

function checkLeapYear(year){
    if(year % 400 === 0){
        return true
    }
    if( year % 100 === 0){
        return false
    }
    if(year % 4 === 0){
        return true
    }
    return false
}

// get the next date 
function getNextDate(date){
    var day = date.day +1 // increment the day
    var month = date.month
    var year = date.year

    var daysInMonth = [31, 28,31,30,31,30,31,31,30,31,30,31]

    if( month === 2){ // check if month is february
        // check if leap year
        if(checkLeapYear(year)){
            if(day > 29){
                day = 1
                month++
            }
        }
        else{
            if(day> 28){
                day =1
                month++
            }
        }
    } 
    else {
        // check if day exceeds max day in month
        if(day> daysInMonth[month-1]){ 
            day = 1
            month++
        }
    }

    if(month> 12){
        month =1 
        year++
    }

    return {
        day:day,
        month : month,
        year: year
    }
}

// get the previous date
function getPreviousDate(date){
    var day = date.day -1
    var month = date.month
    var year = date.year


}

// get next palindrome date
function getNextPalindromeDate(date){
    let count = 0
    let nextDate = getNextDate(date)

    while(1){
        count++
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate)
        if(isPalindrome){
            break
        }
        nextDate = getNextDate(nextDate)
    }

    return [count, nextDate]
}

// check the previous palindrome date
function getPreviousPalindromeDate(date){

}


const dateInput = document.querySelector("#bday-input")
const showButton = document.querySelector("#show-button")
const output = document.querySelector("#output")

function clickHandler(e){
    // console.log(dateInput.value)
    var bdayString = dateInput.value

    if(bdayString !== ''){
        var listOfDates = bdayString.split('-')
        var date = {
            day : Number(listOfDates[2]),
            month : Number(listOfDates[1]),
            year: Number(listOfDates[0])
        }
        // console.log(date)
        var isPalindrome = checkPalindromeForAllDateFormats(date)
        // console.log(isPalindrome)
        if(isPalindrome){
            output.innerText = ` Yay ! your birthday ${bdayString} is a palindrome !! :) `
        }
        else {
            var [count , nextDate] = getNextPalindromeDate(date)
            output.innerText = `the next nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days`
        }
    }
}

showButton.addEventListener('click', clickHandler)