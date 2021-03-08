const common = require('./../../common.js');

//Build an array of conditions.
const conditionArray = {
    'bleeding'	: 'You\'re bleeding, afflicted with a grievous wound that is difficult to treat. You suffer one Mortal Wound at the end of your Turn. Bleeding can be stopped with a successful Toughness Test (DN 4), or if another character aids you with the Medicae Skill. You can attempt to use Medicae on yourself but do so at +1DN.',
    'blinded'	: 'You\'re unable to see properly. Increase the DN for any sight-related task (including all combat Tests) by 4, replacing any lesser vision penalties. \r\rAt the GM\'s discretion you may use a Combat Action to remove the Blinded condition, using a narratively appropriate Skill.',
    'exhausted'	: 'You are weary from battle or persistent effort and suffer from fatigue. On your Turn, you can only Walk or Crawl, perform a basic Combat Action (attack with no combat options, such as Aim or Multi-Attack), or Fall Back. Additionally, you may not roll Determination. Any Shock suffered by an Exhausted character is immediately converted into Mortal Wounds. \r\rCertain circumstances directly inflict Exhaustion. You are automatically Exhausted if your Shock increases beyond your Maximum Shock. Certain weapons, psychic powers, or Ruin Actions can also cause you to become Exhausted even while you are below your Maximum Shock. \r\rIf you are Exhausted from a source other than exceeding your Maximum Shock, that effect determines how you remove the Exhausted condition. Otherwise, the Exhausted condition is removed whenever you recover Shock.',
    'fear'		: 'You\'re scared. Whatever is causing your Fear might also make you anxious, or trigger physical reactions like rapid breathing, shaking, and a lack of focus. \r\rWhen you encounter something that causes Fear, you roll your Resolve against a DN dictated by the source of Fear. Success allows you to act normally. If you fail, you suffer +2DN to all Tests. The penalty lasts until the end of the scene or until an ally passes a Leadership (Fel) Test of DN 2 + the source\'s Fear value. \r\rA being that causes Fear is immune to Fear and Intimidation Interaction Attacks.',
    'frenzied'	: 'Whether whipped into a zealous fury or auto injecting Frenzon combat stims, you\'re Frenzied. You lose all sense of self-preservation and throw yourself into the thick of combat. \r\rWhen you become Frenzied, you may choose to embrace the frenzy or attempt to resist it. If you choose to resist, at the start of your Turn make a DN 3 Willpower Test. If you pass, the rage subsides and you resist the frenzy. \r\rIf the effect is triggered, embraced, or otherwise not resisted, you are Frenzied and must try to get into close combat as quickly as possible, charging the nearest visible enemy. If you are in cover, you break cover and move towards the nearest enemy. \r\rWhile Frenzied, you are immune to Fear and cannot be Pinned and must always use the All-Out Attack option, if possible. You gain +1 to your Strength Attribute While Frenzied.',
    'hindered'	: 'Something\'s holding you back. While Hindered increase the DN for all Tests by +1, or higher if the rules of whatever is hindering you say so. Hindered lasts for one Round, unless otherwise stated.',
    'on fire'	: 'You\'re on fire! You take 1d3 Mortal Wounds at the start of each of your Turns. After taking the Mortal Wound, you must pass a DN 3 Willpower Test or be Hindered until the end of the Round. More information can be found on p.201.',
    'pinned'	: 'You\'re under heavy fire, and there\'s a chance your Resolve breaks under the pressure. If you are targeted with a Pinning Attack attack, you may be Pinned. \r\rTo see if you are Pinned, make a Resolve Test with a DN equal to the Salvo value of the weapon, and add +1 DN for each additional enemy targeting you with a Pinning Attack (a Mob counts as a single attacker). If you fail, you lose your Movement and either hunker down behind existing cover or use your Movement to move towards the nearest cover on your next Turn. \r\rWhile Pinned, you can\'t Charge or leave cover. You suffer a +2 DN penalty to Ballistic Skill (A) Tests against the enemies using Pinning Attack While you are Pinned. \r\rAn ally may attempt to rally their comrades on their Turn by making a Leadership (Fel) Test with the same DN as the Resolve Test, adding an extra +1DN if a Pinned character has taken any damage during the combat. If the Test is successful, the character successfully rallies any Pinned allies within 5 metres, ending the effect.',
    'poisoned'	: 'You\'ve been inflicted with one of the galaxy\'s countless pathogens, plagues, or viruses. You could be suffering from neurotoxins injected into your system, alien acid splashed on you, or Nurgle\'s contagions. All of these dangers leave you Poisoned. \r\rYou suffer a +2 DN penalty to all Tests while Poisoned. Some poisons also inflict damage based on the poison. Some poisons may affect your ability to function instead of, or in addition to, causing damage. The Poisoned condition ends when you are treated using the Medicae Skill or you succeed on a Toughness Test (DN based on the poison) at the beginning of your Turn.',
    'prone'		: 'You\'re knocked down on the ground. Your Defence is reduced by 2 against any attack made by a Threat within 5 metres of you. Your Defence is increased by 1 when you\'re attacked from 6 or more metres away. If you become Prone while flying, you fall to the ground and suffer falling damage (p.201). \r\rStanding up when Prone is a Free Action on your Turn. If you stand up in this way, you can only use the Standard Movement option; you can\'t use combat options such as Brace or Aim. An adjacent character may use their Movement to help you stand up immediately when you\'re Prone.',
    'restrained': 'You\'re bound, possibly by some form of entangling attack such as an Genestealer Cultist Webber, a Barbed Strangler, or a good old-fashioned net. While Restrained you lose your Movement action for that Turn and your Defence is reduced by 2.',
    'staggered'	: 'You\'re off balance; you\'ve run too fast over rough terrain, ordnance has impacted nearby, or you\'ve been clipped by a stray bullet. \r\rWhen you move While Staggered, your Speed is reduced by half. You can\'t Run or Sprint unless otherwise stated. The Staggered condition ends at the beginning of the next Round.',
    'terror'	: 'You\'re overcome with a sense of intense dread and rational thought becomes impossible: this is allconsuming Terror. \r\rMake a Resolve Test against the DN of the source of Terror. If you pass, you may act normally on your Turn. If you fail, you suffer all of the effects of Fear, and you must use every action available on each of your Turns to move as far away as possible until you no longer have line of sight to the source of Terror. Terror lasts until the end of the scene or until an ally passes a Leadership (Fel) Test of DN 2 + the Terror value. \r\rAny effect that grants a bonus to Fear Tests also applies to Terror Tests. Any effect that grants immunity to Fear grants one extra Icon on your Resolve Test against Terror. A being that causes Terror is immune to Fear, Terror, and Intimidation Interaction Attacks.',
    'vulnerable': 'Your defences are open! While Vulnerable, you suffer −1 to your Defence. Certain abilities and effects increase this penalty. Being Vulnerable lasts until the end of your next Turn.'
};

module.exports = {
    name: 'condition',
    description: [
        'Provides more information about the condition called on by the syntax.',
        'List of conditions:',
        'bleeding      blinded',
        'exhausted     fear',
        'frenzied      hindered',
        'on fire       pinned',
        'poisoned      prone',
        'restrained    staggered', 
        'terror        vulnerable'
    ],
    usage: [
        'condition {condition}'
    ],
    prefix: [
        '!wg',
    ],
    execute(context){
        const conditionType = context.trim();
        
        //This function provides information about the conditions listed.
        if(conditionType in conditionArray){
            const condOutput = [
                '[**'+conditionType.toUpperCase()+'**]',
                conditionArray[conditionType]
            ];
            return condOutput.join('\r');
        } else {return common.badCall('condition');}
    }, 
};