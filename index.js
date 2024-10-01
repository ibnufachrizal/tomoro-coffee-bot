const fs = require("fs");
var fetch = require("node-fetch");
var chalk = require("chalk");
const readlineSync = require("readline-sync");

function regisNum(nohp) {
    const index = fetch('https://api-service.tomoro-coffee.id/portal/app/member/sendMessage?areaCode=62&phone='+nohp+'', {
        headers: {
          'Host': 'api-service.tomoro-coffee.id',
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Applanguage': 'en',
          'Revision': '2.6.2',
          'Countrycode': 'id',
          'Devicecode': '' + rand(8).toUpperCase() + '-' + rand(4).toUpperCase() + '-' + rand(4).toUpperCase() + '-' + rand(4).toUpperCase() + '-' + rand(12).toUpperCase() + '',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-ID;q=1.0, id-ID;q=0.9',
          'User-Agent': 'TomoroCoffee/2.6.2 (com.tomoro.indonesia.ios-app; build:2.6.2; iOS 17.1.0) Alamofire/5.8.0',
          'Timezone': 'Asia/Jakarta',
          'Appchannel': 'ios',
          'Connection': 'close'
        }
      })

        .then(async res => {
            try {
            const data = await res.json()
            return data
            } catch(err) {

            }
        })
    return index
}

function verifyOtp(nohp, code) {
    const index = fetch('https://api-service.tomoro-coffee.id/portal/app/member/loginOrRegister', {
        method: 'POST',
        headers: {
          'Host': 'api-service.tomoro-coffee.id',
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Applanguage': 'en',
          'Countrycode': 'id',
          'Devicecode': '' + rand(8).toUpperCase() + '-' + rand(4).toUpperCase() + '-' + rand(4).toUpperCase() + '-' + rand(4).toUpperCase() + '-' + rand(12).toUpperCase() + '',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-ID;q=1.0, id-ID;q=0.9',
        //   'Content-Length': '172',
          'User-Agent': 'TomoroCoffee/2.6.2 (com.tomoro.indonesia.ios-app; build:2.6.2; iOS 17.1.0) Alamofire/5.8.0',
          'Timezone': 'Asia/Jakarta',
          'Appchannel': 'ios',
          'Connection': 'close'
        },
        body: JSON.stringify({
          'city': 'East Jakarta',
          'phone': nohp,
          'type': 2,
          'phoneArea': '62',
          'country': 'Indonesia',
          'pageSource': 'me',
          'verifyCode': code,
          'deviceName': 'iPhone',
          'ip': '10.14.35.30'
        })
      })

        .then(async res => {
            try {
            const data = await res.json()
            return data
            } catch(err) {

            }
        })
    return index
}

(async () => {
    console.log(chalk.green('Tomoro Creator Account'))
    console.log(chalk.yellow('Shared to Braincore'))

    console.log()
    const nohp = readlineSync.question('noHp?? +62 : ');
    console.log()

    const registerNumber = await regisNum(nohp);
    if (registerNumber.msg == "success") {
        console.log(chalk.white('[')+chalk.green('!')+chalk.white(']'), `Waiting For Register +62${nohp}`)
        console.log(`    Successfully sending message to your phne`)
    } else {
        console.log(chalk.white('[')+chalk.green('!')+chalk.white(']'), `Failure For Register +62${nohp}`)
        process.exit(0)
    }

    const code = readlineSync.question('Code?? : ');

    const registerAccount = await verifyOtp(nohp, code);
    if (registerAccount.data.token) {
        console.log(chalk.yellow(`    Successfully register account`))
        fs.appendFileSync("tokenTomoro.txt", `${registerAccount.data.token}\n`);
    } else {
        console.log(chalk.yellow(`    Failurer verify account`))
    }
})();

function rand(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
