//下半部分的铅笔
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class DownPencil extends Pencil{

    constructor(top) {
        const  image = Sprite.getImage('pencilDown');
        super(image, top);
    }

    draw() {
        let gap = Director.getInstance().gap;
        this.y = this.top + gap;
        super.draw();
    }
    
}