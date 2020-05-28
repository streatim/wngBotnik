const common = require('./../common.js');

const objectivesArray = {
        'sororitas':[
            'Exult the rewards of sacrifice in the Emperor\'s name.',
            'Invoke an Imperial Saint (such as Alicia Dominica or Celestine) to bless your achievements.',
            'Recant a holy litany applicable to the current situation.',
            'Fill your lungs with a bolstering hymn in a time of stress.',
            'Recall a wise stricture your Drill Abess laid down and its application to the current situation.',
            'Purge a heretical item (or individual) with holy flame.'
        ],
        'telepathica':[
            'Utilise your feared reputation in a social situation.',
            'Extoll the virtues of your training in honing your already considerable willpower.',
            'Express gratitude for the Emperor\'s guiding hand, protecting you from the Warp.',
            'Pass judgement on an individual you have never met through knowledge from "warp-sight".',
            'Dismiss the potential extent of psychic powers as being rumour or propaganda.',
            'Appraise another individual for psychic potential.'		
        ],
        'mechanicus':[
            'Commune with a Machine Spirit.',
            'Calculate the odds of any given task and provide an estimate of survival or success.',
            'Reminisce about a Forge World you have visited and compare it to your current location.',
            'Examine an interesting piece of technology, determining a flaw or potential improvement.',
            'Give praise to the Omnissiah for some small miracle.',
            'Extoll the virtues of augmetics over the weakness of the flesh.'		
        ],	
        'ministorum':[
            'Utilise blind faith to achieve your goals.',
            'Emphasise the power of faithful deeds over words.',
            'Recant a holy litany applicable to the current situation.',
            'Fill your lungs with a bolstering hymn in a time of stress.',
            'Chastise an individual for their lack of faith.',
            'Convert a non-believer to the truth of the Imperial Cult'		
        ],	
        'militarum':[
            'Express confidence (or the opposite) in the virtue of overwhelming numbers and firepower.',
            'Apply a lesson from the Imperial Infantryman\'s Uplifting Primer to the current situation.',
            'Recant a holy litany applicable to the current situation.',
            'Compare the protection given by faith in the Emperor to a piece of armour or cover.',
            'Cite the logistical use of hatred for the enemy.',
            'Obey an order without question or doubt.'		
        ],	
        'inquisition':[
            'Complete a social interaction without revealing your identity.',
            'Demonstrate the superiority of the philosophy of your Ordo.',
            'Gauge the approximate interrogative breaking point for an individual.',
            'Postulate on the weakness of the mutant, the alien, or the renegade.',
            'Cleanse the filth of the enemy with holy flame.',
            'Establish your authority using a symbol of office.'		
        ],	
        'rogue':[
            'Make a profit in coin, connections, or information.',
            'Use your proud dynastic lineage — real or fabricated — to seal a deal.',
            'Spend some time admiring your ship and reminiscing on journeys through the void.',
            'Compare your current environment to a strange world beyond the frontier you have visited.',
            'Recant an experience you had with a xenos species that applies to the current situation.',
            'Use your Warrant of Trade to get your way or refuse a request.'		
        ],	
        'scum':[
            'Apply your experience in a crime to the current situation.',
            'Verbally estimate the black market value of an item or person.',
            'Recount a desperate act of survival you once made.',
            'Use some gang slang — invented or real.',
            'Explain how a common object has an alternative use — probably as a weapon.',
            'Decry the violence and villainy of authority.'		
        ],	
        'astartes':[
            'Dedicate a victory in combat to the Primarch (or if unknown, honour) of your Chapter.',
            'Apply the wisdom of the Codex Astartes to a situation.',
            'Clarify your duty — or lack thereof — in the current circumstances.',
            'Speak a motto or saying of your Chapter.',
            'Practice one of the traditions or rituals of your Chapter.',
            'Ruminate on the divide between Astartes and mortals.'		
        ],		
        'aeldari':[
            'Unfavourably compare another Species\' culture, art, or technology to your own.',
            'Devote an accomplishment or victory to an Aeldari God.',
            'Recount a lesson from the traditions of a Craftworld that applies to the current situation.',
            'Utilise the reputation of your Species to manipulate an individual.',
            'Employ knowledge you learned from an earlier Path of your life to the current circumstances.',
            'Apply your superior intellect and sensitivity to prophecy to carry out a perfect plan.'		
        ],	
        'orks':[
            'Start a fight.',
            'Solve a problem with the brutality of Gork.',
            'Demonstrate the wisdom of one of your Clans traditions.',
            'Kustomize a piece of Wargear.',
            'Solve a problem with the sage knowledge that bigger is better.',
            'Apply the kunnin\' of Mork to a situation.'		
        ],	
        'chaos':[
            'Corrupt an innocent individual.',
            'Extoll the benefits (or negatives) of gaining the attention of the Chaos Gods.',
            'Pervert a religious icon, dedicating it to the Ruinous Powers.',
            'Point out a flaw in Imperial culture or philosophy that will lead to its downfall.',
            'Create confusion, incite bloodshed, pursue decadence, or spread disease.',
            'Claim an act or event is evidence of the favour (or contempt) of the Ruinous Powers.'		
        ]		
    }

const objective = function objective(context) {    
    const objectiveContext = context.trim();
    if(objectiveContext in objectivesArray){
        const objectiveDice = common.dice(6);
        const objectiveOutput = [
            objectiveContext.charAt(0).toUpperCase()+objectiveContext.slice(1)+' Objective ('+objectiveDice+')',
            '*'+objectivesArray[objectiveContext][objectiveDice-1]+'*'
        ]
        return objectiveOutput.join('\r');
    } else {return(common.badCall('objective'));}
}

module.exports = objective;