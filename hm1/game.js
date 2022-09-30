#!/usr/bin/env node

const readln = require('readline')
random = Math.round(Math.random() * 100)

let cl = readln.createInterface( process.stdin, process.stdout ),
    question = function(q) {
        return new Promise( (res, rej) => {
            cl.question( q, answer => {
                res(answer);
            })
        });
    };

(async function main() {
    let answer;
    console.log(`Программа загадала число от 0 до 100, попробуй отгадай (${random}) `)
    answer = await question('Первая попытка: ');
    while ( +answer !== random ) {
        answer = await question('Неверно, попробуй еще раз: ');
    }
    console.log( 'Правильно!');
    cl.close();
})();
