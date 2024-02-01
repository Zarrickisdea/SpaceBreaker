import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletModel')
export class BulletModel {

    private tweenDuration: number = 0

    constructor(tweenDuration: number) {
        this.tweenDuration = tweenDuration;
    }

    public getTweenDuration(): number {
        return this.tweenDuration;
    }

    public setTweenDuration(tweenDuration: number) {
        this.tweenDuration = tweenDuration;
    }
}


