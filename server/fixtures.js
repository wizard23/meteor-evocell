if (Rules.find().count() === 0) {
    Rules.insert({
        name: 'Game of Life',
        url: 'rules/GameOfLife'
    });

    Rules.insert({
        name: 'Evoloop',
        url: 'rules/EvoloopN9'
    });

  Rules.insert({
    name: 'LudwigShips',
    url: 'rules/enemy_ludwigBuildships'
  });
}