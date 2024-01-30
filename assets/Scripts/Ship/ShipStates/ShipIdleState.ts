import { _decorator } from 'cc';
import { ShipBaseState } from './ShipBaseState';
const { ccclass, property } = _decorator;

@ccclass('ShipIdleState')
export class ShipIdleState extends ShipBaseState {

    public enter(): void {
        super.enter();
        this.stateTimer = this.controller.getShipModel().getRandomIdleTime();
    }

    public onBeginContact(selfCollider: any, otherCollider: any, contact: any): void {
        super.onBeginContact(selfCollider, otherCollider, contact);
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        if (this.stateTimer <= 0) {
            this.controller.changeState('Fire');
        }
    }

    public exit(): void {
        super.exit();
    }
}


