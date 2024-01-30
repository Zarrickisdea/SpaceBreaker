import { _decorator } from 'cc';
import { ShipController } from './ShipController';
import { ShipIdleState } from './ShipStates/ShipIdleState';
import { ShipFireState } from './ShipStates/ShipFireState';
import { ShipBaseState } from './ShipStates/ShipBaseState';
const { ccclass, property } = _decorator;

@ccclass('ShipModel')
export class ShipModel {

    private hitsToKill: number = 0;

    private minIdleTime: number = 1;
    private maxIdleTime: number = 2;

    private minFireCooldown: number = 1;
    private maxFireCooldown: number = 3;

    private shipController: ShipController = null;

    private shipIdleState: ShipIdleState = null;
    private shipDeadState: ShipFireState = null;
    private currentState: ShipBaseState = null;

    constructor(hitsToKill: number) {
        this.hitsToKill = hitsToKill;
    }

    public getHitsToKill(): number {
        return this.hitsToKill;
    }

    public setHitsToKill(hitsToKill: number): void {
        this.hitsToKill = hitsToKill;
    }

    public getRandomIdleTime(): number {
        return Math.random() * (this.maxIdleTime - this.minIdleTime) + this.minIdleTime;
    }

    public getRandomFireCooldown(): number {
        return Math.random() * (this.maxFireCooldown - this.minFireCooldown) + this.minFireCooldown;
    }

    public setShipController(shipController: ShipController): void {
        this.shipController = shipController;
    }

    public initializeStates(): void {
        this.shipIdleState = new ShipIdleState(this.shipController);
        this.shipDeadState = new ShipFireState(this.shipController);
    }

    public getCurrentState(): ShipBaseState {
        return this.currentState;
    }

    public getState(stateName: string): ShipBaseState {
        switch (stateName) {
            case 'Idle':
                return this.shipIdleState;
            case 'Fire':
                return this.shipDeadState;
            default:
                return null;
        }
    }
}


