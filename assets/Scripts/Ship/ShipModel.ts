import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShipModel')
export class ShipModel {

    private hitsToKill: number = 0;

    constructor(hitsToKill: number) {
        this.hitsToKill = hitsToKill;
    }

    public getHitsToKill(): number {
        return this.hitsToKill;
    }

    public setHitsToKill(hitsToKill: number): void {
        this.hitsToKill = hitsToKill;
    }
}


