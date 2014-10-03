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

if (Palettes.find().count() === 0) {
  Palettes.insert({
    name: 'Fire',
    colors: [[0,0,0,0], [128, 0, 0, 255], [255, 0, 0, 255], [255, 128, 0, 255], [255, 255, 0, 255], [255, 255, 255, 255]]
  });

  Palettes.insert({
    name: 'Ice',
    colors: [[0,0,0,0], [0, 0, 128, 255], [0, 0, 0,255, 255], [0, 128, 255, 255], [128, 128, 255, 255], [255, 255, 255, 255]],
  });
}