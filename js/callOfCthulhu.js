var dice = require('./dice.js');

exports.getRandomPlayerStats = function () {
    var stats = {};

    stats.Name = characterNames[getRandomIndex(characterNames)];
    stats.Occupation = occupations[getRandomIndex(occupations)];

    var statNames = ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'];
    var values = [40, 50, 50, 50, 60, 60, 70, 80];

    for (var i = 0; i < statNames.length; i++) {
        var full = values.splice(getRandomIndex(values), 1)[0];
        var half = Math.floor(full / 2);
        var fifth = Math.floor(full / 5);

        stats[statNames[i]] = full + ' (' + half + '/' + fifth + ')';
    }

    stats['Full HP'] = Math.floor((getFull(stats['SIZ']) + getFull(stats['CON'])) / 10);
    stats['HP'] = stats['Full HP'];
    stats['SAN'] = getFull(stats['POW']);
    stats['Luck'] = dice.roll(3, 6) * 5;
    stats['MP'] = getFifth(stats['POW']);

    var STR_plus_SIZ = getFull(stats['STR']) + getFull(stats['SIZ']);
    var damageBonus;
    var build;

    if (STR_plus_SIZ <= 64) {
        damageBonus = '-2;'
        build = '-2';
    } else if (STR_plus_SIZ <= 84) {
        damageBonus = '-1';
        build = '-1';
    } else if (STR_plus_SIZ <= 124) {
        damageBonus = 'None';
        build = '0';
    } else if (STR_plus_SIZ <= 164) {
        damageBonus = '+1D4';
        build = '+1';
    } else {
        damageBonus = '+1D6';
        build = '+2';
    }

    stats['DB'] = damageBonus;
    stats['Build'] = build;

    return stats;
}

function getFull(stat) {
    return parseInt(stat.split(' ')[0]);
}

function getFifth(stat) {
    return parseInt(stat.split('/')[1].split(')')[0]);
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

var characterNames = [
    'Eaton Monahan',
    'Stuart Jermyn',
    'Prof. Lyman Williamson',
    'Philip Schmidt',
    'Lyndon Rawlings',
    'Sheldon Capwell',
    'Sebastian Brigham',
    'Albert Harker',
    'Edward Harding',
    'Nicodemus Brandon',
    'Tony Carter',
    'Booker Nelson',
    'Hiram Merriam',
    'Hayden Glendon',
    'Perry Updike',
    'Lt. Edward Champney',
    'Loren Quinlan',
    'Milton Dewey',
    'Nathaniel Harrison',
    'Robert Mercer',
    'Novella Pitman',
    'Faye Elgin',
    'Mildred Bowen',
    'Eleanor Mercer',
    'Marilyn Sterling',
    'Neva Harker',
    'Stella Fuller',
    'Evelyn Devereux',
    'Marilyn Kingston',
    'Shirley Wilson',
    'Theresa Ashley',
    'Cora Gunther',
    'Sophie Sherman',
    'Sarah Fenner',
    'Neva Sargent',
    'Jane Verner',
    'Irene Everett',
    'Amanda Starkweather',
    'Annie Godfrey',
    'Novella Upton'
];

var occupations = [
    'Accountant',
    'Acrobat',
    'Agency Detective',
    'Ambassador',
    'Antique Dealer',
    'Architect',
    'Artist',
    'Author',
    'Bank Robber',
    'Barber',
    'Bartender',
    'Bible Salesman',
    'Big Game Hunter',
    'Book Dealer',
    'Bookie',
    '\“Boss\”',
    'Bounty Hunter',
    'Boxer',
    'Wrestler',
    'Burglar',
    'Bus Driver',
    'Catholic Priest',
    'Clergyman',
    'Clerk',
    'Cocktail Waitress',
    'Communist',
    'Radical',
    'Company Officer',
    'Executive',
    'Columnist',
    'Con Man',
    'Deacon',
    'Elder',
    'Deep-sea Diver',
    'Dentist',
    'Designer',
    'Dilettante',
    'DJ',
    'Drifter',
    'Editor',
    'Elected official',
    'Entertainer',
    'Explorer',
    'Farmer',
    'Farm Hand',
    'Federal Agent',
    'Fence',
    'Field Researcher',
    'Film Crew',
    'Film Star',
    'Fireman',
    'Foreign Correspondent',
    'Forger',
    'Counterfeiter',
    'Forester',
    'Forensic Investigator',
    'Forensic Surgeon',
    'Gambler',
    'Gangster',
    'Gardener',
    'Golf Pro',
    'Gravedigger',
    'Hacker',
    'Hired Goon',
    'Hit Man',
    'Hobo',
    'Hooker',
    'Journalist',
    'Judge',
    'Lawyer',
    'Librarian',
    'Loan Shark',
    'Lumberjack',
    'Manager',
    'Coach',
    '(Medical) Technician',
    'Mental Hospital Attendant',
    'Mercenary',
    'Military Officer',
    'Miner',
    'Missionary',
    'Mountain Climber',
    'Museum Curator',
    'Musician',
    'News Chopper Pilot',
    'Nurse',
    'Occultist',
    'Painter',
    'Sculptor',
    'Parapsychologist',
    'Pharmacist',
    'Photographer',
    'Photojournalist',
    'Physician',
    'Pick Pocket',
    'Pilot',
    'Plastic Surgeon',
    'Police Detective',
    'Policeman',
    'Practising Attorney',
    'Preacher',
    'Private Investigator',
    'Professional Sports Athlete',
    'Professor',
    'Teacher',
    'Programmer',
    'Prosecuting Attorney',
    'Protestant Minister',
    'Psychologist',
    'Punk',
    'Rabbi',
    'Racecar Driver',
    'Ranch Hand',
    'Cowboy',
    'Reporter',
    'Researcher',
    'Sailor',
    'Salesman',
    'Secretary',
    'Shifty Accountant',
    'Lawyer',
    'Small Business Owner',
    'Smuggler',
    'Soldier',
    'Marine',
    'Spy',
    'Stage Actor',
    'Stage Hand',
    'Stock Broker',
    'Student',
    'Intern',
    'Stunt Man',
    'Surveyor',
    'Swimmer',
    'Diver',
    'Talent Agent',
    'Taxi Driver',
    'Telephone Operator',
    'Tennis Pro',
    'Tribal Member',
    'Undertaker',
    'Uniformed Police Officer',
    'Union Activist',
    'Writer',
    'Zookeeper'
];