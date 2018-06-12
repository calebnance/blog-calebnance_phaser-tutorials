window.onload = function() {
  // global vars
  var map, layer, cursors, sprite;

  // config
  var config = {
    preload: preload,
    create: create,
    render: render,
    update: update,
    resize: resize
  };

  var self = this;

  // create game
  var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'tutorial-9', config);

  // preload() happens here
  function preload() {
    console.log('call::preload()');
    // preload tilemap
    game.load.tilemap('tutorial-2-tilemap', 'tilemap/2-tilemap-tutorial.json', null, Phaser.Tilemap.TILED_JSON);
    // preload tile asset for tilemap
    game.load.image('tiles', 'tilemap/tileset-blocks-1.png');
    // load in a new sprite
    game.load.image('goku-single', 'img/sprite-goku-single.png');
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
    // set bounds to tilemap size
    game.world.setBounds(0, 0, 800, 800);
    // set keyboard input listeners
    cursors = game.input.keyboard.createCursorKeys();
    // paint the sprite to the canvas (centered)
    sprite = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'goku-single');
  }

  function render() {
    // console.log('call::render()');
  }

  function update() {
    // console.log('call::update()');
    // speed of movement
    var movementRate = 3;
    // only move one direction at a time
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      game.camera.x -= movementRate;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      game.camera.x += movementRate;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      game.camera.y -= movementRate;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      game.camera.y += movementRate;
    }
  }

  function resize() {
    console.log('call::resize()');
  }

  document.addEventListener("touchstart", touchHandler);
  document.addEventListener("touchmove", touchHandler);
  var lastY, lastX;

  function touchHandler(e) {
    var movementRate = 3;
    if(e.touches) {
      var currentY = e.touches[0].clientY;
      var currentX = e.touches[0].clientX;
      if(currentY > lastY){
        //  alert('down');
        game.camera.y += movementRate;
      } else if(currentY < lastY) {
        //  alert('up');
        game.camera.y -= movementRate;
      }

      if(currentX > lastX){
        //  alert('right');
         game.camera.x += movementRate;
      } else if(currentX < lastX) {
        //  alert('left');
        game.camera.x -= movementRate;
      }
      lastY = currentY;
      lastX = currentX;
      // game.camera.y += movementRate;
      // playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
      // playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
      // output.innerHTML = "Touch: "+ " x: " + playerX + ", y: " + playerY;
      e.preventDefault();
    }
  }

  var button = document.querySelector('button');
  button.addEventListener('click', function(){
    var movementRate = 3;
    game.camera.y += movementRate;
  });
};
