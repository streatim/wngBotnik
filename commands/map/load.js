const {
    connection, 
    test
} = require('./../../sql/functions.js');
module.exports = {
    name: 'load',
    description: [
        'Loads an existing map.'
    ],
    usage: [
        'load'
    ],
    async execute(msgContext, prefix, msg){
        return await test(connection);
        //return 'Test Complete';
        /*
        msg.channel.send({
            embed: {
                title: '**'+userResponses[0]+'**',
                image: {
                    url: 'https://otfbm.io/10x10?bg='+userResponses[1]
                }
            }
        }).then(sentMessage => {
            msg.channel.messages.fetch({around: sentMessage.id, limit: 1})
            .then(message => {
                //message.first().pin();
            });
        });
        */
    }
}