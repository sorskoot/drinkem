import * as PIXI from 'pixi.js';

class Game {

    constructor() {
        this.app = new PIXI.Application({ width: 640, height: 640, antialias: false, });
        document.body.appendChild(this.app.view);
        this.beers = [];
        this.count = 0;
        PIXI.Loader.shared
            .add('beer_0.png')
            .add('beer_1.png')
            .load((loader) => {
                this.createScene();
            });
    }
    trigger(sprite) {
        this.count++;
        let x = sprite.x / 80;
        let y = sprite.y / 80;
        this.toggle(x, y);
        this.toggle(x-1, y);
        this.toggle(x+1, y);
        this.toggle(x, y-1);
        this.toggle(x, y+1);
        if(this.checkIfComplete()){
            setTimeout(()=>{
                if(confirm(`"You won in ${this.count} moves! restart?`)){
                    this.app.stage.removeChildren();
                    this.beers.length=0;
                    this.count = 0;
                    this.createScene();
                }
            },20);
        }
    }

    toggle(x, y) {
        if (x >= 0 && x < 7 && y >= 0 && y < 7)
            if (this.beers[y + (x * 7)].state === 1) {
                this.beers[y + (x * 7)].sprite.texture =
                    PIXI.Loader.shared.resources['beer_0.png'].texture;
                this.beers[y + (x * 7)].state = 0;
            } else {
                this.beers[y + (x * 7)].sprite.texture =
                    PIXI.Loader.shared.resources['beer_1.png'].texture;
                this.beers[y + (x * 7)].state = 1;
            }
    }

    checkIfComplete(){
        return !~this.beers.findIndex(b=>b.state === 1);
    }

    createScene(){
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 7; y++) {
                let sprite2 = new PIXI.Sprite(
                    PIXI.Loader.shared.resources['beer_1.png'].texture
                );
                sprite2.x = x * 80;
                sprite2.y = y * 80;
                this.app.stage.addChild(sprite2);
                sprite2.interactive = true;
                sprite2.on('click', (event) => {
                    this.trigger(event.target);
                });

                this.beers.push({ state: 1, sprite: sprite2 });
            }
        }
    }
}

export default Game;