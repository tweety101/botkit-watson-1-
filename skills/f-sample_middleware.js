

const watsonMiddleware = require('botkit-middleware-watson')({
  iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
  url: process.env.ASSISTANT_URL,
  workspace_id: process.env.WORKSPACE_ID,
  version: '2018-07-10',
  minimum_confidence: 0.50, // (Optional) Default is 0.75
});




module.exports = function(controller) {
  
    controller.middleware.receive.use(watsonMiddleware.receive);

    controller.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
      if (message.watsonError) {
        bot.reply(message, "there is some error with watson");
        console.log(message.watsonError);
      } else {
        bot.reply(message, message.watsonData.output.text.join('\n'));
      }
    });


    // controller.middleware.receive.use(function(bot, message, next) {
    //
    //     // do something...
    //     console.log('RCVD:', message);
    //     next();
    //
    // });
    //
    //
    // controller.middleware.send.use(function(bot, message, next) {
    //
    //     // do something...
    //     console.log('SEND:', message);
    //     next();
    //
    // });

}
