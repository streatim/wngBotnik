//This absolutely needs to be debugged and fixed. Maybe split the Array? Traumatic and Regular injuries work slightly different.
const common = require('./../common.js');

const injuryArray = {
    'traumatic': {
        'values': [
            {injury: 'Hand',
             effect: 'You suffer a severe hand injury. You can no longer use your SIDE hand. If you have now lost both hands you are unable to hold any weapons or similar gear.'},
            {injury: 'Arm',
             effect: 'You suffer a severe arm injury. You can no longer use your SIDE arm. If you have now lost both arms you are unable to hold any weapons or similar gear.'},
            {injury: 'Foot',
             effect: 'You suffer a severe foot injury. You can no longer use your SIDE foot. If you have now lost both feet, you are unable to walk, run, or sprint, and may only crawl (pg. 180).'},
            {injury: 'Leg',
             effect: 'You suffer a severe leg injury. You can no longer use your SIDE leg. If you have now lost both legs, you are unable to walk, run, or sprint, and may only crawl (pg. 180).'},
            {injury: 'Torso',
             effect: 'You suffer a severe injury that impairs your organs, like the heart, lungs, or liver. Any Toughness based Tests may become more difficult.'},
            {injury: 'Eye',
             effect: 'Your SIDE eye is damaged beyond repair. A single injured eye may add a penalty, such as +2DN, to any tests that require sight. If you have now lost both eyes, you are blinded (pg. 199).'}
        ],
        'matrix': [0,1,2,3,4,5]
    },
    'regular': {
        'values': [
            {injury: 'Battle Scar',
            effect: 'Missing Fingers'},
            {injury: 'Focused Burn',
            effect: 'Severe Burn'},
            {injury: 'Broken Jaw',
            effect: 'Cut Tongue'},
            {injury: 'Twitch',
            effect: 'Bad Knee'},
            {injury: 'Torn Ear',
            effect: 'Nagging Wound'}
        ],
        'matrix': [0,0,1,2,3,4]
    }
}



const injury = function injury(context) {
    const injuryContext = context.trim();
    const injuryRoll = common.dice(6);
    const side = (common.dice(6)%2==0) ? 'left' : 'right'; 
    const injuryType = (injuryContext === 'traumatic') ? 'traumatic' : 'regular';
    const injuryIndex = injuryArray[injuryType]['matrix'][injuryRoll-1];
    const injuryDesc = injuryArray[injuryType]['values'][injuryIndex]['effect'];
    const injuryEffect = (injuryContext === 'traumatic') ? '[**Effect**] '+injuryDesc.replace('SIDE', side) : '[**Escalation**] '+injuryDesc;

    const output = [
        injuryType.toUpperCase()+' INJURY ('+injuryRoll+')',
        '[**Result:**] '+injuryArray[injuryType]['values'][injuryIndex]['injury'],
        injuryEffect
    ]    
    return output.join('\r');
}
module.exports = injury;