import { _decorator } from 'cc';
import { ShipBaseState } from './ShipBaseState';
const { ccclass, property } = _decorator;

@ccclass('ShipIdleState')
export class ShipIdleState extends ShipBaseState {

    public enter(): void {
        super.enter();
        console.log('ShipIdleState Enter');
    }

    public exit(): void {
        super.exit();
        console.log('ShipIdleState Exit');
    }
}


