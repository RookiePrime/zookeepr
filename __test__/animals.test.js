const { filterByQuery, findById, createNewAnimal, validateAnimal  } = require('../lib/animals');
const { animals } = require('../data/animals.json');

jest.mock('fs');

test('Create an animal object', () => {
    const animal = createNewAnimal({ name: 'Darlene', id: 'somethingrather' }, animals);

    expect(animal.name).toBe('Darlene');
    expect(animal.id).toBe('somethingrather');
});

test('Find an animal by its ID', () => {
    const animal = findById('2', animals);

    expect(animal.id).toBe('2');
});

test('Make an animal that can be validated', () => {
    const animal = {
        name: 'Happy',
        id: '25',
        species: 'swallow',
        diet: 'omnivorous',
        personalityTraits: [
            'hungry',
            'rash'
        ]
    };

    const badAnimal = {
        name: 'Karen',
        id: '99',
        species: 'human',
        diet: 'men',
        personalityTraits: 4
    }

    expect(validateAnimal(animal)).toBeTruthy();
    expect(validateAnimal(badAnimal)).toBeFalsy();
});

test('Filter animals down to a specific few', () => {
    const startingAnimals = [
        {
          id: "3",
          name: "Erica",
          species: "gorilla",
          diet: "omnivore",
          personalityTraits: ["quirky", "rash"],
        },
        {
          id: "4",
          name: "Noel",
          species: "bear",
          diet: "carnivore",
          personalityTraits: ["impish", "sassy", "brave"],
        },
      ];
    
      const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
    
      expect(updatedAnimals.length).toEqual(1);
});