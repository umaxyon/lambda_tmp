// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

class Runner {
    constructor(event) {
        this.event = event;
        this.conf = this.getConf()
    }

    getConf() {
        const conf = {};

        ['AWS_REGION','AWS_ACCESS_KEY','AWS_SECRET_ACCESS_KEY'].forEach(key => {
            conf[key] = process.env[key]
        })
        return conf;
    }

    start() {
        console.log(`AWS_REGION=${this.conf['AWS_REGION']}`);
        console.log(`AWS_ACCESS_KEY=${this.conf['AWS_ACCESS_KEY']}`);
        console.log(`AWS_SECRET_ACCESS_KEY=${this.conf['AWS_SECRET_ACCESS_KEY']}`); 
    }
}


exports.lambdaHandler = async (event, context) => {

    const runner = new Runner(event);
    runner.start();

    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
