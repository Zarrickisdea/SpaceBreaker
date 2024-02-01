import { _decorator } from 'cc';
import { ShipBaseState } from './ShipBaseState';
const { ccclass, property } = _decorator;

@ccclass('ShipDeadState')
export class ShipDeadState extends ShipBaseState {

    public enter(): void {
        super.enter();
        this.controller.stopAllStates();
        this.controller.getShipView().playDeadAnimation();
    }

    public exit(): void {
        super.exit();
    }
}


