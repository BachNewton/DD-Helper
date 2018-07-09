exports.getRandomPlayerStats = function () {
    var stats = {};

    stats.Name = characterNames[getRandomIndex(characterNames)];
    stats.Occupation = occupations[getRandomIndex(occupations)];

    var statNames = ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'];
    var values = [40, 50, 50, 50, 60, 60, 70, 80];

    for (var i = 0; i < statNames.length; i++) {
        stats[statNames[i]] = values.splice(getRandomIndex(values), 1)[0];
    }

    return stats;
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
    'Drifter'
];