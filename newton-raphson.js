var parser = require('mathjs').parser();
const readline = require('readline');
var async = require('async');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var initGuess,
    delta,
    maxGuess,
    diff,
    g;

async.series([
    (callback) => {
        rl.question("Please type in a function of one variable that you want to evaluate: ", (equation) => {
            parser.eval('f(x) = ' + equation);
            g = parser.get('f');
            callback();
        })
    },
    (callback) => {
        rl.question("Enter an initial guess: ", (guess) => {
            initGuess = parseFloat(guess);
            callback();
        })
    },
    (callback) => {
        rl.question("Enter an delta, i.e. f(x + delta): ", (increment) => {
            delta = parseFloat(increment);
            callback();
        })
    },
    (callback) => {
        rl.question("Enter the maximum number of times you want to guess: ", (iteration) => {
            maxGuess = parseFloat(iteration);
            callback();
        })
    },
    (callback) => {
        rl.question("Enter the minimum threshold value: ", (eps) => {
            diff = parseFloat(eps);
            console.log("Working...\n");
            newton(initGuess, delta, maxGuess, diff, g);
            callback();
        })
    }
], () => {
    rl.close();
});

function newton(guess, increment, iteration, eps, f) {
    var rootFound = false;

    for (var i = 0; i < iteration + 1; i++) {
        console.log("Iteration " + i + ", x = " + guess + ", f(x) = " + f(guess));
        var fPrime = (f(guess + increment / 2) - f(guess - increment / 2)) / increment;
        guess += -f(guess) / fPrime;

        if (Math.abs(f(guess)) <= eps) {
            rootFound = true;
            break;
        }
    }

    if (rootFound) {
        console.log("Root found: " + guess);
    } else {
        console.log("No roots found.");
    }
}
