#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// Получение прошлой или будущей даты из параметров
switch (argv._[0]) {
    case 'sub':
        if (argv.y || argv.year) console.log(setYear('sub'))
        if (argv.m || argv.month) console.log(setMonth('sub'))
        if (argv.d || argv.date) console.log(setDay('sub'))
        break
    case 'add':
        if (argv.y || argv.year) console.log(setYear('add'))
        if (argv.m || argv.month) console.log(setMonth('add'))
        if (argv.d || argv.date) console.log(setDay('add'))
        break
}

// Получение текущих значений без доп параметров
if (!argv._[0]) {
    if (argv.y || argv.year) console.log(new Date().getFullYear())
    else if (argv.m || argv.month) console.log(new Date().getMonth() + 1)
    else if (argv.d || argv.date) console.log(new Date().getDate())
    else console.log(new Date())
}

function setYear(param) {
    if (param === 'sub'){
        let m = new Date()
        m.setFullYear(m.getFullYear() - (argv.y || argv.year))
        return m
    }
    if (param === 'add'){
        let y = new Date()
        y.setFullYear(y.getFullYear() + (argv.y || argv.year))
        return y
    }
}

function setMonth(param) {
    if (param === 'sub'){
        let m = new Date()
        m.setMonth(m.getMonth() - (argv.m || argv.month))
        return m
    }
    if (param === 'add'){
        let m = new Date()
        m.setMonth(m.getMonth() + (argv.m || argv.month))
        return m
    }
}

function setDay(param) {
    if (param === 'sub'){
        let d = new Date()
        d.setDate(d.getDate() - (argv.d || argv.date))
        return d
    }
    if (param === 'add'){
        let d = new Date()
        d.setDate(d.getDate() + (argv.d || argv.date))
        return d
    }
}