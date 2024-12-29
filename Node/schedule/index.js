import schedule from 'node-schedule'


// 
schedule.scheduleJob('* * * * * *', function () {
    console.log('corn');
})

// schedule.cancelJob('*/5 * * * *', function () { })











