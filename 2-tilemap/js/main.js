window.onload = function() {
  // config
  var config = {
    preload: preload,
    create: create,
    render: render,
    update: update,
    resize: resize
  };

  // global vars
  var map;
  var layer;

  // create game
  var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'tutorial-2', config);

  // preload() happens here
  function preload() {
    console.log('call::preload()');
    // preload tilemap
    game.load.tilemap('tutorial-2-tilemap', 'tilemap/2-tilemap-tutorial.json', null, Phaser.Tilemap.TILED_JSON);

    // preload tile asset for tilemap
    game.load.image('tiles', 'tilemap/tileset-blocks-1.png');
  }

  // create() happens here
  function create() {
    console.log('call::create()');
    // set background color
    game.stage.backgroundColor = '#787878';
    
    // load up tilemap
    map = game.add.tilemap('tutorial-2-tilemap');
    // link loaded tileset image to map
    map.addTilesetImage('tutorial-2-tilemap_image', 'tiles');
    // create layer for said tileset and map now!
    layer = map.createLayer('tutorial-2_layer');
  }

  function render() {
    // console.log('call::render()');
  }

  function update() {
    // console.log('call::update()');
  }

  function resize() {
    console.log('call::resize()');
  }
};
