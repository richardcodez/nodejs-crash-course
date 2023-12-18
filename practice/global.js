// GLOBAL OBJECT

// console.log(global)

global.setTimeout(() => {
    console.log('in the timeout')
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log("in the interval")
}, 1000);

console.log(__dirname);     //directory path of a file
console.log(__filename);    //absolute path of a file