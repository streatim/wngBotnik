const fs = require('fs');
module.exports = {
    name: 'init',
    description: [
        'Initialize the pfMap bot for this session or channel.'
    ],
    usage: [
        'init {command}'
    ],
    async execute(msgContext, prefix, msg){
        //Set the questions.
        const mapInitializedQuestions = [
            {
                question: 'What is the title of the map? Maximum 10 characters.',
                filterCheck: (response) => {
                    return msg.author.id === response.author.id && 
                    response.content.length <= 10;
                }
            },
            {
                question: 'What is the background URL for this image?',
                filterCheck: (response) => {
                    return msg.author.id === response.author.id && 
                    new RegExp('^(http)s?:\/\/.+$').test(response.content.trim());
                }
            },
            {
                question: 'How large is the map? Use {width}x{height}',
                filterCheck: (response) => {
                    return msg.author.id === response.author.id &&
                    new RegExp('^\\d+x\\d+$').test(response.content.trim());
                }
            },
            {
                question: 'Enable Dark Mode? Yes/No',
                filterCheck: (response) => {
                    return msg.author.id === response.author.id &&
                    new RegExp('^([Yy][Ee][Ss]|[Nn][Oo])$').test(response.content.trim());                    
                }
            }
        ];

        msg.channel.send('Map Initiation Began.');
        let userResponses = [];
        //First ask for a title of the map at a maximum of 10 characters.
        for(i=0;i<mapInitializedQuestions.length;i++){
            const question = mapInitializedQuestions[i].question;
            const filter = mapInitializedQuestions[i].filterCheck;
            let breakStatement = false;
            if(question.length>0){
                await msg.channel.send(question).then(async () => {
                    await msg.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time'] })
                        .then(userResponse => {
                            userResponses.push(userResponse.first().content);
                        })
                        .catch(() => {
                            msg.channel.send(
                                'No valid response given to question:\r' 
                                +'**'+question+'**\r' 
                            );
                            breakStatement = true;
                        })
                });

            }
            if(breakStatement){
                return 'Map Initialization Ended without Saving.';
            }
       }
        if(userResponses.length == mapInitializedQuestions.length){
            //The user has responded to all questions and provided answers that passed the filters. First, let them know:
            output = ['All responses given. Below are your answers:'];
            for(i=0;i<userResponses.length;i++){
                output.push(
                    '**Question**: '+mapInitializedQuestions[i].question,
                    '**Answer**: '+userResponses[i]
                );
            }
            output.push('Saving map:' + userResponses[0]) //Assumes the first question is always the name.
        }
        return output.join('\r');
    },
}