const {dice} = require('./../../common.js');

const perilArray = {
    'values': [
        {name: 'FLICKERING LIGHTS',
        desc: 'For a brief moment, all light sources flicker and go out.'},
       {name: 'HOARFROST',
        desc: 'The temperature instantly drops 20 degrees, and all surfaces within 25 m of you are coated with a thin rime of frost. The temperature returns to normal over the course of a minute. The frost is treated as Difficult Terrain. Anyone who rolls a Complication whilst on the frost falls Prone.'},
       {name: 'ROILING MIST',
        desc: 'A clammy mist roils up from the ground, surrounding you in a 25 m radius. The mist obscures vision and distorts sounds with weird echoes for 1 Round. All Tests made inside the mist that rely on sight or hearing are made at +2 DN.'},
       {name: 'WHISPERS IN THE DARK',
        desc: 'All light sources within 25 m of you grow dim and shadows pool thickly. Sinister whispers echo, and anyone who can hear them must make a successful DN 3 Corruption Test. Any who fail the Corruption roll are Vulnerable [2] for 1 Round.'},
       {name: 'WARP SPECTRES',
        desc: 'For roughly a minute, ethereal images of strange creatures move in and out of existence within 25 m of you. These apparitions move awkwardly, passing through objects and the living alike, seemingly unaware of the real world. All animals immediately flee the area, and any sentient being who witnesses the apparitions must make a DN 3 Fear Test.'},
       {name: 'TEARS OF THE MARTYR',
        desc: 'All paintings, statues, or equivalent effigies within 100 m of you begin to weep blood. If no such features exist in range, then walls or similar surfaces begin to drip with blood. The bleeding persists for 1 minute. All sentient creatures that witness this event must make a DN 3 Fear Test.'},
       {name: 'SINISTER CHORUS',
        desc: 'A sinister chorus or low laughter swirls around you and those in the vicinity. All sentient creatures within 25 m must make a successful DN 3 Willpower Test or are Hindered (1) for one Round. The GM gains 1 Ruin.'},
       {name: 'THE WATCHING',
        desc: 'An overwhelming paranoia of something watching creeps over you and everyone within 20 m. Lesser creatures and animals cower in fear, while sentient creatures must make a successful DN 4 Willpower Test or suffer an uncontrollable compunction to second-guess all their actions — they are Hindered (2). This effect lasts for the remainder of the scene.'},
       {name: 'MIASMA OF DECAY',
        desc: 'The stench of rotting meat and decaying flesh rises from the ground within 25 m of you. All creatures within range must make a DN 3 Toughness Test, including those protected by technological breathing apparatus. Those who fail suffer 1 Shock.'},
       {name: 'BANSHEE SCREAM',
        desc: 'A mighty roar akin to a sonic boom crashes through the air. Lesser animal lifeforms (insects, rodents, avians, etc.) within 25 m are instantly killed. All others suffer '+dice(3)+' Shock and must make a successful DN 3 Toughness Test or are Staggered.'},
       {name: 'UNNATURAL BLOODLUST',
        desc: 'All creatures within 15 m of you suffer from a ringing in their ears and taste the bitterness of iron. During the next round, all melee attacks they make gain +1 ED.'},
       {name: 'THE EARTH PROTESTS',
        desc: 'The ground within 50 m of you is jolted by a sudden but brief earthquake. The tremor causes no real damage, but all in range must make a successful DN 3 Agility Test or be thrown Prone and suffer 1 Shock.'},
       {name: 'LIFE DRAIN',
        desc: 'A numbing cold washes out from you, leeching the very life essence of those nearby. Every living creature within 25 m immediately suffers '+dice(3)+' Shock and all lesser life forms (plants, avians, insects, etc.) wither and die.'},
       {name: 'VISIONS OF POSSIBILITY',
        desc: 'An awful droning buzz surrounds you, drowning out all speech. The drone penetrates the mind. All creatures with the PSYKER Keyword within 10 m must make a DN 4 Intellect Test. Those who fail are Staggered and suffer '+dice(3)+' Shock. Those who succeed gain 1 Wrath.'},
       {name: 'PSYCHIC BACKLASH',
        desc: 'Lurid-pink Warp lightning dances across your flesh. You suffer '+(dice(3)+2)+' Shock.'},
       {name: 'THE VEIL THINS',
        desc: 'The air within 25 m of you thins, causing living creatures to suffer shortness of breath and dizziness. All creatures without artificial breathing apparatus are Hindered (2) for 1 minute. In addition, 1 Wrath Dice must be added to all Psychic Mastery (Wil) Tests for the remainder of the scene.'},
       {name: 'WARPTOUCHED AURA',
        desc: 'The mystical energies of the Warp wash over you and infuse the landscape for 25 m in every direction. All creatures in the area suffer '+dice(3)+' Shock. In addition, the invisible energies flowing through this area greatly increase the potency of psychic phenomena — 1 Wrath Dice must be added to all Psychic Mastery (Wil) for the remainder of the scene.'},
       {name: 'SURGING WARP ENERGIES',
        desc: 'The air seems to shimmer and distort. All creatures within 25 m of you suffer '+dice(6)+' Shock and the GM gains 1 Ruin. For the remainder of the scene, all Wrath Dice rolled as part of a Psychic Mastery Test that don\'t result in a 1 or a 6 must be re-rolled once.'},
       {name: 'UNNATURAL EFFUSIONS',
        desc: 'You vomit foul otherworldly materials uncontrollably, far more than your body could ever produce. You suffer '+dice(6)+' Shock and are Restrained for '+dice(6)+' Rounds.'},
       {name: 'THE CRAWLING',
        desc: 'You are overcome with the sensation of tiny creatures moving just under your skin. You immediately suffer '+(dice(6)+1)+' Shock and must increase the DN of all Tests by 2 for the remainder of the scene.'},
       {name: 'TWISTED FLESH',
        desc: 'The energies of the Warp unleash a corruptive force on your physical form and all creatures within 10m. All affected characters must make a DN 7 Corruption Test. Those who fail gain '+dice(3)+' Corruption (instead of just one) and suffer 1 Mortal Wound.'},
       {name: 'GRAVE CHILL',
        desc: 'The environment around you grows numbingly cold, a supernatural chill suffusing every surface with glistening ice. You and every creature within 50 m suffer a -1 to Agility and Strength for the rest of the scene. In addition, all affected creatures must make a successful DN 5 Toughness Test or suffer 1 Mortal Wound.'},
       {name: 'THE SUMMONING',
        desc: 'A portal is torn open between the Materium and the Warp. A Daemon appears within 25 m of you. The exact location and nature of this daemon is at the GM\'s discretion. The daemonic entity immediately attacks the nearest target. The daemon returns to the Warp after 3 rounds, or when it has been destroyed.'},
       {name: 'VOICES FROM THE BEYOND',
        desc: 'All creatures within 25 m of you hear harsh, guttural voices close to their ear, though their words are seemingly gibberish. All characters within 10 m must make a DN 5 Fear Test. All sentient characters in range are Staggered until the end of the scene.'},
       {name: 'DARK PASSENGER',
        desc: 'A daemon enters your mind. The daemon looks out through your eyes, reporting to whatever cruel entity rules it, and may attempt to influence your actions whenever you roll a Complication. It may whisper foul secrets, make disturbing comments, or otherwise make itself known for the remainder of your existence unless expelled. The GM gains one Ruin, and may rule that the daemon takes other actions. See the Daemonic Possession sidebar below for more information.'},
       {name: 'WRITHING DISFIGUREMENT',
        desc: 'You are wracked with pain, collapsing to the ground. You suffer '+dice(6)+' Shock and gain '+(dice(3)+1)+' Corruption. You must roll on the Minor Mutations table (p.288).'},
       {name: 'SPECTRAL GALE',
        desc: 'Swirling vortexes of misty, inhuman faces sweep past you and spin away in all directions. The distorted images cackle in maniacal glee, and all mortals who hear them struggle to keep order to their thoughts. All living creatures within 25 m of you must make a DN 7 Fear Test.'},
       {name: 'EYE OF THE GODS',
        desc: 'Your mind fleetingly draws the gaze of one of the Ruinous Powers. You and any mortals within 20m must make a DN 7 Corruption Test. Those who succeed gain 1 Wrath Point.'},
       {name: 'BLOOD RAIN',
        desc: 'A hot and sticky blood rain falls in an 8 m radius centered on you. The supernatural storm starts slowly, but quickly builds to a torrent lasting only minutes. Any creature whose flesh is touched by this blood must make a successful DN 7 Willpower Test or become Frenzied. The awful stench of the blood will seep into any item , and may make surfaces slick and slippery.'},
       {name: 'PSYCHIC OVERLOAD',
        desc: 'Streaming Warp energy bursts from your eyes and mouth, flashing in all directions and penetrating all living creatures surrounding you. You suffer '+(dice(6)+dice(6))+' Mortal Wounds and gain '+dice(3)+' points of Corruption. All other creatures within 10 m suffer '+dice(3)+' Mortal Wounds and must make a successful DN 7 Toughness Test or are Blinded.'}		 
    ],
    'matrix': {
        1: [0,0,1,1,2,2],
        2: [3,3,4,4,5,5],
        3: [6,6,7,7,8,8],
        4: [9,9,10,10,11,11],
        5: [12,12,13,13,14,14],
        6: [15,15,16,16,17,17],
        7: [18,18,19,19,20,20],
        8: [21,21,22,22,23,23],
        9: [24,24,25,25,26,26],
        10: [27,27,28,28,29,29]
    }
}

module.exports = {
    name: 'perils',
    description: ['Perils of the Warp command. - !perils {# of Peril Dice}'],
    usage: [
        'perils == !wgperils 1 == !wgroll d66.',
        'perils 3 == !rolld66+20, where the 20 comes from the 2 (3-1) additional perils.'
    ],
    execute(context){
        const perilsDice = parseInt(context);
        const perilAdd = (isNaN(perilsDice)) ? 0 : perilsDice-1;
        const perilRollOne = dice(6);
        const perilRollTwo = dice(6);
        //Tim note: Take a look at this math - is there a better way to do this if the matrix just operates on a standard d66 matrix?
        const perilOneIndex = ((perilRollOne+perilAdd) > 10) ? 10 : perilRollOne+perilAdd;
        const perilIndex = perilArray['matrix'][perilOneIndex][perilRollTwo-1];
        const peril = perilArray['values'][perilIndex];
        
        perilsOutput = [
            'Perils of the Warp ('+perilRollOne.toString()+perilRollTwo.toString()+'+'+(perilAdd*10)+')',
            '[**'+peril['name']+'**]',
            '*'+peril['desc']+'*'
        ]
        return perilsOutput.join('\n');
    }, 
};