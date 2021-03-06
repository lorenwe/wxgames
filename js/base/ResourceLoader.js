// 资源文件加载器，确保在图片资源加载完成后才进行渲染
import {Resources} from "./Resources.js";

export class ResourceLoader {
    constructor() {
        this.map = new Map(Resources);
        for(let [key,value] of this.map) {
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image)
        }
    }

    onLoaded (callback) {
        let loaddeCount = 0;
        for(let value of this.map.values()) {
            value.onload = () => {
                loaddeCount++;
                if(loaddeCount >= this.map.size) {
                    callback(this.map)
                }
            }
        }
    }

    static create() {
        return new  ResourceLoader();
    }
}