//初始化整个游戏精灵，作为游戏开始入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx =this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {

        //重置游戏正常执行
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds);
        //要在游戏逻辑之前创建
        this.director.createPencil();
        this.registerEvent();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {
            e.preventDefault();
            if(this.director.isGameOver) {
                this.init();
            } else {
                this.director.birdsEvent();
            }
        })
    }
}