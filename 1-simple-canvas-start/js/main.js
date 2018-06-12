window.onload = function() {
  // config
  var config = {
    preload: preload,
    create: create,
    render: render,
    update: update,
    resize: resize
  };

  // create game
  var game = new Phaser.Game(200, 200, Phaser.CANVAS, 'start-1', config);

  // preload() happens here
  function preload() {
    console.log('call::preload()');
  }

  // create() happens here
  function create() {
    console.log('call::create()');

    // set background color
    game.stage.backgroundColor = '#787878';
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
