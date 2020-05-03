// import React from "react";
// import { PixiComponent, Stage, Sprite, useTick, Container, useApp } from "@inlet/react-pixi";

// import React from 'react'

// function stage() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default stage

// let renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: true });
// renderer.view.style.width = "100%";
// renderer.view.style.height = "100%";
// renderer.backgroundColor = "0x02020F";
// document.body.appendChild(renderer.view);

// let stage = new PIXI.Container();

// // Init sprites
// let circle = createCircleSprite();

// // Constants
// let numStars = 1000;

// // Init stars
// let stars = [];
// for (let i = 0; i < numStars; i++) {
//   let s = createStar();
//   stars.push(s);
//   stage.addChild(s);
// }
// renderer.render(stage);

// // Render loop
// requestAnimationFrame(animate);
// function animate() {
//   requestAnimationFrame(animate);
//   let time = Date.now() / 1000;
//   for (let i = 0; i < numStars; ++i) {
//     let s = stars[i];
//     let freq = i / numStars;
//     let ampl = i * numStars;
//     s.alpha = freq * Math.sin(time + ampl);
//   }
//   renderer.render(stage);
// }

// // Sprite constructors
// function createCircleSprite() {
//   let circle = new PIXI.RenderTexture(renderer, 16, 16);
//   let graphics = new PIXI.Graphics();
//   graphics.beginFill(0xffffff);
//   graphics.drawCircle(8, 8, 1);
//   graphics.endFill();
//   circle.render(graphics);
//   return circle;
// }

// // Element constructors
// function createStar() {
//   let s = new PIXI.Sprite(circle);
//   let scale = Math.random() * 2;
//   s.position.x = Math.random() * renderer.width;
//   s.position.y = Math.random() * renderer.height;
//   s.alpha = Math.random();
//   s.scale.x = scale;
//   s.scale.y = scale;
//   return s;
// }
