window.onload = function() {
  // global vars
  var map, layer, cursors, sprite;

  var allowMovement = false;

  var canMoveText = document.getElementsByClassName('movement-state');
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // config
  var config = {
    preload: preload,
    create: create,
    render: render,
    update: update,
    resize: resize
  };

  var tracker = new tracking.ObjectTracker(['face']);
  // var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });
  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (event.data.length) {
      // console.log('looking');
      allowMovement = true;
    } else {
      // console.log('not looking');
      allowMovement = false;
    }

    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
  });

  // create game
  var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'tutorial-10', config);

  // preload() happens here
  function preload() {
    console.log('call::preload()');
    // preload tilemap
    game.load.tilemap('tutorial-2-tilemap', 'tilemap/2-tilemap-tutorial.json', null, Phaser.Tilemap.TILED_JSON);
    // preload tile asset for tilemap
    game.load.image('tiles', 'tilemap/tileset-blocks-1.png');
    // load in a new spritesheet
    game.load.spritesheet('goku-4-panel', 'img/sprite-goku-4-panel.png', 32, 32, 4);
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
    sprite = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'goku-4-panel');
    // set to first frame (0 = top left block)
    sprite.animations.frame = 0;
    // set the anchor for sprite to middle of the view
    sprite.anchor.setTo(0.5);
    // tell camera to follow sprite now
    game.camera.follow(sprite);
    // enable game physics to sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    // set sprite to hit boundaries of our world bounds
    sprite.body.collideWorldBounds = true;
  }

  function render() {
    // console.log('call::render()');

    // add a transparent green fill to sprite
    // game.debug.spriteBounds(sprite);
  }

  function update() {
    // console.log('call::update()');

    // is the user not looking at the screen?
    if (allowMovement === false) {
      canMoveText[0].innerText = "can't move";
      return false;
    }
    canMoveText[0].innerText = "can move";

    // speed of movement
    var movementRate = 3;
    // only move one direction at a time
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      sprite.animations.frame = 1;
      sprite.x -= movementRate;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      sprite.animations.frame = 2;
      sprite.x += movementRate;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      sprite.animations.frame = 3;
      sprite.y -= movementRate;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      sprite.animations.frame = 0;
      sprite.y += movementRate;
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
      e.preventDefault();

      var currentY = e.touches[0].clientY;
      var currentX = e.touches[0].clientX;
      if(currentY > lastY){
        sprite.y += movementRate;
        // alert('down');
      } else if(currentY < lastY) {
        // alert('up');
        sprite.y -= movementRate;
      }

      if(currentX > lastX){
        // alert('right');
         sprite.x += movementRate;
      } else if(currentX < lastX) {
        // alert('left');
        sprite.x -= movementRate;
      }
      lastY = currentY;
      lastX = currentX;
    }
  }
};
