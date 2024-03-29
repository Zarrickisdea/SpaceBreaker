import { _decorator } from 'cc';
import { ShipBaseState } from './ShipBaseState';
const { ccclass, property } = _decorator;

@ccclass('ShipFireState')
export class ShipFireState extends ShipBaseState {

    public enter(): void {
        super.enter();
        this.stateTimer = this.controller.getShipModel().getRandomFireCooldown();
        this.controller.fireBullet();
    }

    public onBeginContact(selfCollider: any, otherCollider: any, contact: any): void {
        super.onBeginContact(selfCollider, otherCollider, contact);
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        if (this.stateTimer <= 0) {
            this.controller.changeState(this.controller.getShipModel().getState('Idle'));
        }
    }

    public exit(): void {
        super.exit();
    }
}


