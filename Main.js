//初始化整个游戏精灵，作为游戏开始入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

        //DataStore.getInstance().canvas.width
        //DataStore.getInstance().canvas.height

    }

    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'audios/bgm.mp3';
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.director = Director.getInstance();
        this.createBackgroundMusic();
        this.init();
    }

    init() {
        //重置游戏正常执行
        this.director.isGameOver = false;
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton);
        //要在游戏逻辑之前创建
        this.director.createPencil();
        this.registerEvent();
        this.director.run();
    }

    registerEvent() {
        // this.canvas.addEventListener('touchstart', e => {
        //     e.preventDefault();
        //     if(this.director.isGameOver) {
        //         this.init();
        //     } else {
        //         this.director.birdsEvent();
        //     }
        // })
        wx.onTouchStart(() => {
          if(this.director.isGameOver) {
              this.init();
          } else {
              this.director.birdsEvent();
          }
        });
    }
}