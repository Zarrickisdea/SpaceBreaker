import { _decorator } from 'cc';
import { ShipBaseState } from './ShipBaseState';
const { ccclass, property } = _decorator;

@ccclass('ShipFireState')
export class ShipFireState extends ShipBaseState {

    public enter(): void {
        super.enter();
        console.log('ShipFireState Enter');
        this.controller.fireBullet();
    }

    public exit(): void {
        super.exit();
        console.log('ShipFireState Exit');
    }
}


