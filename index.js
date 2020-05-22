if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
  console.log('\nChecked ' +i+' codes!\nFound '+a+' working codes!')
  process.exit();
});

const fs = require('fs');
const request = require('request');
const colors = require('colors')
const Agent = require('socks5-http-client/lib/Agent');
const SocksProxyAgent = require('socks-proxy-agent')
const autograbproxy = true
const noerrormessages = true
let type = "HTTP"
let socks5 = false
let socks4 = false

//Options
const codes = "codes.txt"; //codes.txt and proxies.txt is just an example, put the filename of where your codes are stored.
const proxies = "proxies.txt"; //proxies.txt can be http proxies or socks5 proxies! Remember, if you are using socks5, change const socks5 = false to const socks5 = true
const proxygen = true
const speed = 65 //Measured in milliseconds
const debug = false //Debug Mode: Set to true or false
let autogen = true //Auto generate codes (automatically turns on if codes.txt is empty): Set to true or false

let i = 0 //DO NOT CHANGE THIS!
let a = 0 //THIS TOO!

if (proxygen) {
 socks5 = false
  request.get({
    uri: 'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=200',
}, function (err, resp, body) {
  fs.writeFile('proxies.txt', body, function(err) {
    if(err) {
        throw err;
    }

  });
});
}

console.log(colors.white(`\n-------------------------------------\n[CHECKER] Discord Nitro Code Checker\n[CHECKER] Author: loading8009#0827 (spicyness\'s alt)\n-------------------------------------\nSettings\n-------------------------------------\n[CHECKER] Debug Mode: ${debug}\n[CHECKER] Proxy Type: ${type}\n[CHECKER] Auto-Gen: ${autogen}\n[CHECKER] Fetch Proxies: ${autograbproxy}\n-------------------------------------\n`))

getGiftCode = function () {
    let code = '';
    let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for(var i = 0; i < 16; i++){
        code = code + dict.charAt(Math.floor(Math.random() * dict.length));
    }
    return code;
}

function ri() {
setInterval(function(){
function getRandomLine(filename, callback){
  fs.readFile(filename, function(err, data){
    if(err) throw err;
    data = data.toString()
    var lines = data.split('\n');
    var r = Math.floor(Math.random() * lines.length);
    callback(lines[r])
 });
}
if (autogen) {
let code = getGiftCode()
let proxy
getRandomLine(proxies, function(result){proxy = result; sendRequest();});
if (socks5) {
function sendRequest(){
if (proxy.split(':').length > 2) {
  console.log(colors.red('Authentication is not supported yet!'))
}
request.get({
    uri: 'http://discordapp.com/api/v6/entitlements/gift-codes/'+code+'?with_application=false&with_subscription_plan=true',
    agentClass: Agent,
    agentOptions: {
		  socksHost: proxy.split(':')[0],
		  socksPort: proxy.split(':')[1]
	  }
}, function (err, resp, body) {
    if (err) {
      
        return console.log(colors.yellow(`[CHECKER] Connection error, retrying with a new proxy`));
      
    }
    try {
            body = JSON.parse(body);
            if(body.message != "Unknown Gift Code" && body.message != "You are being rate limited."){
                console.log(colors.green(`[CHECKER] Hit: https://discord.gift/${code}`));
                fs.appendFileSync("working.txt", code+'\n', "UTF-8",{'flags': 'a+'});
                i++
                a++
            }
            else {
                console.log(colors.red(`[CHECKER] Miss: ${code}` + colors.white(`${debug ? `\n[DEBUG] Proxy: ${proxy}\n[DEBUG] Message: ${body.message}` : ''}`)));
                i++
            }
        }
        catch (error) {
      
        return console.log(colors.yellow(`[CHECKER] Invalid response, retrying with a new proxy`));
      
        }
});
}
} else if (socks4) {
  function sendRequest(){
let aGent = new SocksProxyAgent('socks4://'+proxy);
request.get({
    uri: 'http://discordapp.com/api/v6/entitlements/gift-codes/'+code+'?with_application=false&with_subscription_plan=true',
    agent: aGent
}, function (err, resp, body) {
    if (err) {
      
        return console.log(colors.yellow(`[CHECKER] Connection error, retrying with a new proxy`));
      
    }
    try {
            body = JSON.parse(body);
            if(body.message != "Unknown Gift Code" && body.message != "You are being rate limited."){
                console.log(colors.green(`[CHECKER] Hit: https://discord.gift/${code}`));
                fs.appendFileSync("working.txt", code+'\n', "UTF-8",{'flags': 'a+'});
                i++
                a++
            }
            else {
                console.log(colors.red(`[CHECKER] Miss: ${code}` + colors.white(`${debug ? `\n[DEBUG] Proxy: ${proxy}\n[DEBUG] Message: ${body.message}` : ''}`)));
                i++
            }
        }
        catch (error) {
      
        return console.log(colors.yellow(`[CHECKER] Invalid response, retrying with a new proxy`));
      
        }
});
}
} else {
function sendRequest(){
request.get({
    uri: 'http://discordapp.com/api/v6/entitlements/gift-codes/'+code+'?with_application=false&with_subscription_plan=true',
    proxy: 'http://'+proxy
}, function (err, resp, body) {
    if (err) {
      
        return console.log(colors.yellow(`[CHECKER] Connection error, retrying with a new proxy`));
      
    }
    try {
            body = JSON.parse(body);
            if(body.message != "Unknown Gift Code" && body.message != "You are being rate limited." && body.message != "404: Not Found"){
                console.log(colors.green(`[CHECKER] Hit: https://discord.gift/${code}`));
                fs.appendFileSync("working.txt", code+'\n', "UTF-8",{'flags': 'a+'});
                i++
                a++
            }
            else {
                console.log(colors.red(`[CHECKER] Miss: ${code}` + colors.white(`${debug ? `\n[DEBUG] Proxy: ${proxy}\n[DEBUG] Message: ${body.message}` : ''}`)));
                i++
            }
        }
        catch (error) {
      
        return console.log(colors.yellow(`[CHECKER] Invalid response, retrying with a new proxy`));
      
        }
});
}
}
} else {
let code
let proxy
getRandomLine(codes, function(result){code = result});
getRandomLine(proxies, function(result){proxy = result; sendRequest();});
if (socks5) {
function sendRequest(){
request.get({
    uri: 'http://discordapp.com/api/v6/entitlements/gift-codes/'+code+'?with_application=false&with_subscription_plan=true',
    agentClass: Agent,
    agentOptions: {
		  socksHost: proxy.split(':')[0],
		  socksPort: proxy.split(':')[1]
	  }
}, function (err, resp, body) {
    if (err) {
      
        return console.log(colors.yellow(`[CHECKER] Connection error, retrying with a new proxy`));
      
    }
    try {
            body = JSON.parse(body);
            if(body.message != "Unknown Gift Code" && body.message != "You are being rate limited." && body.message != "404: Not Found"){
                console.log(colors.green(`[CHECKER] Hit: https://discord.gift/${code}`));
                fs.appendFileSync("working.txt", code+'\n', "UTF-8",{'flags': 'a+'});
                i++
                a++
            }
            else {
                console.log(colors.red(`[CHECKER] Miss: ${code}` + colors.white(`${debug ? `\n[DEBUG] Proxy: ${proxy}\n[DEBUG] Message: ${body.message}` : ''}`)));
                i++
            }
        }
        catch (error) {
      
        return console.log(colors.yellow(`[CHECKER] Invalid response, retrying with a new proxy`));
      }

});
}
} else if (socks4) {
  function sendRequest(){
let aGent = new SocksProxyAgent('socks4://'+proxy);
request.get({
    uri: 'http://discordapp.com/api/v6/entitlements/gift-codes/'+code+'?with_application=false&with_subscription_plan=true',
    agent: aGent
}, function (err, resp, body) {
    if (err) {
      
        return console.log(colors.yellow(`[CHECKER] Connection error, retrying with a new proxy`));
      
    }
    try {
            body = JSON.parse(body);
            if(body.message != "Unknown Gift Code" && body.message != "You are being rate limited."){
                console.log(colors.green(`[CHECKER] Hit: https://discord.gift/${code}`));
                fs.appendFileSync("working.txt", code+'\n', "UTF-8",{'flags': 'a+'});
                i++
                a++
            }
            else {
                console.log(colors.red(`[CHECKER] Miss: ${code}` + colors.white(`${debug ? `\n[DEBUG] Proxy: ${proxy}\n[DEBUG] Message: ${body.message}` : ''}`)));
                i++
            }
        }
        catch (error) {
      
        return console.log(colors.yellow(`[CHECKER] Invalid response, retrying with a new proxy`));
      
        }
});
}
} else {
function sendRequest(){
request.get({
    uri: 'http://discordapp.com/api/v6/entitlements/gift-codes/'+code+'?with_application=false&with_subscription_plan=true',
    proxy: 'http://'+proxy
}, function (err, resp, body) {
    if (err) {
      
        return console.log(colors.yellow(`[CHECKER] Connection error, retrying with a new proxy`));
      
    }
    try {
            body = JSON.parse(body);
            if(body.message != "Unknown Gift Code" && body.message != "You are being rate limited." && body.message != "404: Not Found"){
                console.log(colors.green(`[CHECKER] Hit: https://discord.gift/${code}`));
                fs.appendFileSync("working.txt", code+'\n', "UTF-8",{'flags': 'a+'});
                a++
                i++
            }
            else {
                console.log(colors.red(`[CHECKER] Miss: ${code}` + colors.white(`${debug ? `\n[DEBUG] Proxy: ${proxy}\n[DEBUG] Message: ${body.message}` : ''}`)));
                i++
            }
        }
        catch (error) {
      
        return console.log(colors.yellow(`[CHECKER] Invalid response, retrying with a new proxy`));
      
        }
});
}
}
}


}, speed);
}