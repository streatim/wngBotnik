const {
    connection, 
    test
} = require('./../../sql/functions.js');
module.exports = {
    name: 'create',
    description: [
        'Creates records for the map tool.',
        'Tokens are limited to 10 characters.',
        'Can be used with the following options:',
        'campaign, background, map'
    ],
    usage: [
        'create campaign {Campaign Token} <-- Creates a campaign identified by {token}.',
        'create background {token}-{URL} <0-- Creates a background image located at {URL} and identified by {token}',
        'create map {campaign token}-{backgroundtoken} <-- Creates a map for use in a campaign identifed by the campaign token, using an image identified by backgroundtoken. Additional options are specified by questions.'
    ],
    async execute(msgContext, prefix, msg){
        const dbConnection = await test(connection);
        if(dbConnection !== 'TRUE'){
            return dbConnection;
        } else {
            //There is a valid connection and we can now confirm the context/take input.
            


        }
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