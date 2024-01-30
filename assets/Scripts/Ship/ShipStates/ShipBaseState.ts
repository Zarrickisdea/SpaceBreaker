import { _decorator } from 'cc';
import { ShipController } from '../ShipController';
import { BaseState } from '../../State Machine/BaseState';
import { PhysicsLayers } from '../../Constants/GameConstants';
const { ccclass, property } = _decorator;

@ccclass('ShipBaseState')
export class ShipBaseState extends BaseState {

    protected controller: ShipController = null;

    constructor(controller: ShipController) {
        super();
        this.controller = controller;
    }

    public enter(): void {
        super.enter();
        this.stateTimer = 0;
    }

    public update(deltaTime: number): void {
        this.stateTimer -= deltaTime;
    }

    public onBeginContact(selfCollider, otherCollider, contact): void {
        console.log('ShipBaseState onBeginContact');

        if (otherCollider.group === PhysicsLayers.pBullet) {
            this.controller.onHit();

            setTimeout(() => {
                otherCollider.node.active = false;
            }, 1);
        }
    }

    public exit(): void {
        super.exit();
        this.stateTimer = 0;
    }
}


