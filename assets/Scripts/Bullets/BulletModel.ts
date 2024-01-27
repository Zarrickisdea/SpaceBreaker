import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletModel')
export class BulletModel {

    private speed: number = 0

    constructor(speed: number) {
        this.speed = speed;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(speed: number) {
        this.speed = speed;
    }
}


