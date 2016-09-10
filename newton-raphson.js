function f(x) {
    return x * x + 2 * x - 4;
}

function newton(guess, increment, iteration, eps) {
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

newton(10, 1e-3, 100, 1e-6);
