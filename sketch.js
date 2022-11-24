const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ball;
var blower;
var blowerMouth;
var button;
//var ground;

function setup() {
  var canvas = createCanvas(500, 500);

  engine = Engine.create();
  world = engine.world;

  ball = new Ball(width / 2 + 80, height / 2 - 80, 80, 80);
  blower = new Blower(width / 2 - 50, height / 2 + 50, 150, 20);
  blowerMouth = new BlowerMouth(width / 2 + 70, height / 2 + 20, 100, 90);
  button = createButton("Click to Blow");
  button.position(width / 2, height - 100);
  button.class("blowButton");

  button.mousePressed(blow);

  ground = Bodies.rectangle(0, 450, 500, 20, {isStatic: true});
  World.add(world, ground);
}

function draw() {
  background(59);
  Engine.update(engine);
  push()
  fill("grey")
  rectMode(CENTER)
  rect(ground.position.x, ground.position.y, 500, 20);
  pop()

  blower.show();
  if(ball!=null) {
    ball.show()
    collisionWithBlower();
  } 
  blowerMouth.show();

  if(collide(ground, ball)) {
    fill("white")
    textSize(30)
    text("game over!", 250, 250)
  }
}

function blow() {
  Matter.Body.applyForce(ball.body, {x:0, y:0}, {x:0, y:0.05});
}

function collisionWithBlower(index) {
  for (var i = 0; i < ball.length; i++) {
    if (ball[index] !== undefined && ball[i] !== undefined) {
      var collision = Matter.SAT.collides(ball[index].body, ball[i].body);

        Matter.World.remove(world, ball[index].body);
        delete ball[index];
      }
    }
  }

function collide(body1, body2)
{
  if(body2!=null)
        {
         var d = dist(body1.position.x ,body1.position.y, body2.body.position.x, body2.body.position.y);
          if(d<=80)
            {
              World.remove(engine.world, ball);
               ball = null;
               return true; 
            }
            else{
              return false;
            }
         }
}