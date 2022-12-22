#!usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let ratesMap = new Map();
ratesMap.set("USD", { "USD": 1, "PKR": 226.24374, "INR": 82.748325, "EUR": 0.93974126, "GBP": 0.82736784, "JPY": 132.01311, "CNY": 6.9792683, "AED": 3.6725 });
ratesMap.set("PKR", { "USD": 0.00442006, "PKR": 1, "INR": 0.36702946, "EUR": 0.0041702345, "GBP": 0.0036587484, "JPY": 0.58553105, "CNY": 0.030969891, "AED": 0.016292657 });
ratesMap.set("INR", { "USD": 0.012086212, "PKR": 2.732179, "INR": 1, "EUR": 0.0041702345, "GBP": 0.011352094, "JPY": 1.5950637, "CNY": 0.084353096, "AED": 0.044386708 });
ratesMap.set("EUR", { "USD": 1.0641592, "PKR": 240.7404, "INR": 88.055836, "EUR": 1, "GBP": 0.88042992, "JPY": 140.4992, "CNY": 7.4276908, "AED": 3.9083616 });
ratesMap.set("GBP", { "USD": 1.2090796, "PKR": 273.55943, "INR": 100.05348, "EUR": 1.1358529, "GBP": 1, "JPY": 159.58462, "CNY": 8.4384361, "AED": 4.4396215 });
ratesMap.set("JPY", { "USD": 0.0075761061, "PKR": 1.7139941, "INR": 0.6269568, "EUR": 0.007116668, "GBP": 0.0062644217, "JPY": 1, "CNY": 0.052874864, "AED": 0.027822133 });
ratesMap.set("CNY", { "USD": 0.14327158, "PKR": 32.413755, "INR": 11.855816, "EUR": 0.13458734, "GBP": 0.11847166, "JPY": 18.911817, "CNY": 1, "AED": 0.52618826 });
ratesMap.set("AED", { "USD": 0.27229408, "PKR": 61.553342, "INR": 22.533645, "EUR": 0.2557166, "GBP": 0.22511293, "JPY": 35.943808, "CNY": 1.9004502, "AED": 1 });
function getRates(from, to, amount) {
    let rates = ratesMap.get(from);
    let rate;
    rate = rates[to];
    return rate * amount;
}
async function askQuestion() {
    await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "cur1",
            message: chalk.blackBright("Which currency do you have to convert?"),
            choices: ['PKR', 'INR', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AED'],
        },
        {
            type: "list",
            name: "cur2",
            message: chalk.blackBright("Which currency do you want to convert into?"),
            choices: ['PKR', 'INR', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AED'],
            when(answers) {
                return answers.cur1;
            }
        },
        {
            type: "input",
            name: "amountI",
            message: chalk.yellowBright("Enter the amount here!"),
            validate: async (amountI) => {
                if (isNaN(amountI)) {
                    return chalk.yellowBright("Please enter a valid number!");
                }
                return true;
            },
        }
    ])
        .then((answers) => {
        let results = getRates(answers.cur1, answers.cur2, answers.amountI.toLocaleString('en-US'));
        console.log(`${answers.cur1} ${chalk.greenBright(answers.amountI.toLocaleString('en-US'))}/- is equals to ${answers.cur2} ${chalk.green(results.toLocaleString('en-US'))}/-`);
        // Use user feedback for... whatever!!
    });
}
async function startagain() {
    var again;
    do {
        await askQuestion();
        again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: "Do you want to convert more?",
            default: "(Y or N)"
        });
    } while (again.restart == 'y' || again.restart == 'Y');
}
startagain();
