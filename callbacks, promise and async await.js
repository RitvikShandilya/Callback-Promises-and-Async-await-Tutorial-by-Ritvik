//Callbacks

const { callbackify } = require("util");

function Name() {
    setTimeout(() => {
        return "Hello after 2 sec";
    }, 2000);
}

const message = Name();
console.log(message);

//To make the above code work, we use callbacks

function Name(cb) {
    setTimeout(() => {
        cb("Hello after 2 sec");
    }, 2000);
}

Name(function (message) {
    console.log(message)
});

//Problem solved!

// A new sitauation arises where there are 2 async code blocks

function Name(cb) {
    setTimeout(() => {
        cb("Hello after 2 sec");
    }, 2000);
}

function Name2(cb) {
    setTimeout(() => {
        cb("Hello after 3 sec");
    }, 3000);
}

//Now we call them both

Name(function (message) {
    console.log(message)
});

Name2(function (message) {
    console.log(message)
});

//Now we want to call Name2 before Name

Name2(function (message) {
    console.log(message)
    Name(function (message) {
        console.log(message)
    });
});

//This creates a callback hell

//Promises comes to our rescue
//Promises represent the upcoming completion or failure of an async event and its resulting value

const sub = new Promise((resolve, reject) => {
    setTimeout(() => {
        const result = true;
        if (result) resolve("true condition");
    }, 2000);
});

sub.then((response) => {
    console.log(response);
});

//implementing the above callbacks with promise

function Name() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello after 2 sec");
        }, 2000);
    });
}

function Name2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello after 3 sec");
        }, 3000);
    });
}

// calling Name2
Name2().then((res) => {
    console.log(res);
});

//calling Name 2 before name

Name2().then((res) => {
    console.log(res);
    Name().then((res) => {
        console.log(res);
    });
});

//But this again creates callback hell 
//To solve that, we use promises chaining

Name2().then((res) => {
    console.log(res);
    return Name();
}).then((res) => {
    console.log(res);
});


//Async/await - The modern approach of handling promises async/await

async function result() {
    const message1 = await Name();
    console.log(message1);
    const message2 = await Name2();
    console.log(message2);
}


// Solving with callback

const weathers = ["sunny", "cloudy", "windy", "stormy", "partly cloudy",
    "rainy"];
//BACK END API
const getClimate = (cb) => {
    //Random delay between 0 an 1 second
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
        //Generate a random number between 0 and 5
        const randomWeather = Math.floor(Math.random() * 6);
        cb(weathers[randomWeather]);
    }, delay);
};
//FRONT END PAGE
const getClimateMessage = () => {
    getClimate(function (weather) { console.log(`The weather today is ${weather}`) });
};
getClimateMessage();



//Solving with Promise

const weathers = ["sunny", "cloudy", "windy", "stormy", "partly cloudy",
    "rainy"];
//BACK END API
function getClimate() {
    return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
        //Generate a random number between 0 and 5
        const randomWeather = Math.floor(Math.random() * 6);
        resolve(weathers[randomWeather]);
    }, delay);
});
}
//FRONT END PAGE
const getClimateMessage = () => {
    getClimate().then((response) => {
        console.log(`The weather today is ${response}`);
    });
}
getClimateMessage();


//Solving with async await

const weathers = ["sunny", "cloudy", "windy", "stormy", "partly cloudy",
    "rainy"];
//BACK END API
function getClimate() {
    return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
        //Generate a random number between 0 and 5
        const randomWeather = Math.floor(Math.random() * 6);
        resolve(weathers[randomWeather]);
    }, delay);
});
}
//FRONT END PAGE
const getClimateMessage = async () => {
    const weather = await getClimate();
    console.log(`The weather today is ${weather}`);
}
getClimateMessage();