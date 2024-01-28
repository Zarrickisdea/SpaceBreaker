import { _decorator, Component, Node } from 'cc';
import { ShipController } from './ShipController';
const { ccclass, property } = _decorator;

@ccclass('ShipModel')
export class ShipModel {

    private hitsToKill: number = 0;
    private shipController: ShipController = null;

    constructor(hitsToKill: number) {
        this.hitsToKill = hitsToKill;
    }

    public getHitsToKill(): number {
        return this.hitsToKill;
    }

    public setHitsToKill(hitsToKill: number): void {
        this.hitsToKill = hitsToKill;
    }

    public setShipController(shipController: ShipController): void {
        this.shipController = shipController;
    }

    public initializeStates(): void {
        
    }
}


