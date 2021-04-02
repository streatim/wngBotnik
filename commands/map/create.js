const {
    connection, 
    test
} = require('./../../sql/functions.js');
const { Campaigns } = require('./../../sql/mapTables.js');
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
            //Failed connection. Return the error.
            return dbConnection;
        } else {
            //There is a valid connection and we can now confirm the context/take input.
            console.log(msgContext);
            switch (msgContext.split(' ')[0]) {
                case 'campaign':
                        const campToken = msgContext.replace('campaign ', '');
                        const campaignAdmin = msg.author.id;

                        try {
                            // equivalent to: INSERT INTO Campaigns (campaignToken, adminID) values (?, ?);
                            const camp = await Campaigns.create({
                                campaignToken: campToken,
                                adminID: campaignAdmin,
                            });
                            console.log(`Tag ${camp.campaignToken} added.`);
                        }
                        catch (e) {
                            if (e.name === 'SequelizeUniqueConstraintError') {
                                console.log('That tag already exists.');
                            }
                            console.log(e.name);                          
                        }
                        break;
                case 'background':
                        console.log('Background picked.');
                        break;
                case 'map':
                        console.log('Map picked.');
                        break;

            }
            //console.log(prefix);
            //console.log(msg);
            return 'Truuuuuue';
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