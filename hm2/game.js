#!/usr/bin/env node

const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const path = require('path');
const fs = require("fs");
const readln = require('readline')

random = Math.round(Math.random())

let cl = readln.createInterface(process.stdin, process.stdout),
    userInput = function (q) {
        return new Promise((res) => {
            cl.question(q, answer => {
                res(answer);
            })
        });
    };

(async function main() {
   const fileName = path.join(__dirname, argv.file);

    if(argv.logs) {
        await getStatistics(fileName)
        cl.close();
    }
    else {
        const name = await userInput('Введите ваше имя: '),
            currentDate = createDate();

        console.log(`Игра орел или решка, программа загадала число (0 или 1), попробуй отгадай (${random}) `)

        let answer = await userInput('Первая попытка: '),
            victory;

        if (+answer !== random){
            console.log('Ты проиграл!')
            victory = false
            await mainSaveFileLogic(name, currentDate, victory, fileName)
            cl.close();
        } else {
            console.log('Ты выиграл!')
            victory = true
            await mainSaveFileLogic(name, currentDate, victory, fileName)
            cl.close();
        }
    }

})();

function createDate() {
    let data = new Date(),
        hour = data.getHours(),
        minutes = data.getMinutes(),
        seconds = data.getSeconds(),
        year = data.getFullYear(),
        month = data.getMonth(),
        day = data.getDate();

    return `Дата: ${day}.${month}.${year} время: ${hour}:${minutes}:${seconds}`
}

async function saveFile(jsonData, fileName) {
    await fs.writeFile(fileName, jsonData, (err) => {
        if (err) console.log(err);
    });
}

function createJsonData(name, date, attempts) {
    return JSON.stringify([{name, date, attempts}])
}

async function mainSaveFileLogic(name, currentDate, victory, fileName) {

    let jsonDt = createJsonData(name, currentDate, victory)

    // Проверяем наличие файлы
    await fs.access(fileName, (error) => {
        // Если файла нет - создаем и сохраняем начальный json
        if (error) saveFile(jsonDt, fileName);
        else {
            // Если файл существуем, то создаем новый объект
            let player = {name, currentDate, victory};
            // Парсим json и добавляем в конец созданный объект
            let playersJSON = fs.readFileSync(fileName, "utf-8"),
                players = JSON.parse(playersJSON);
            players.push(player)

            // Пересохраняем файл
            saveFile(JSON.stringify(players), fileName);
        }
    });
}

async function getStatistics(fileName) {

    let playersJSON = fs.readFileSync(fileName, "utf-8"),
        players = JSON.parse(playersJSON);

    let wins = players.filter(player => player.victory === true),
        lose = players.filter(player => player.victory === false),
        winPercent = ((wins.length * 100) / players.length),
        losePercent = ((lose.length * 100) / players.length);

    console.log('Подробная статистика:')
    console.log('Общее количество партий: ', players.length)
    console.log('Количество побед: ', wins.length)
    console.log('Количество поражений: ', lose.length)
    console.log('Процент побед: ', winPercent, '%')
    console.log('Процент поражений: ', losePercent, '%')
}