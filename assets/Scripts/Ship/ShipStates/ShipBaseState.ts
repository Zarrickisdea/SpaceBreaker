import { _decorator } from 'cc';
import { ShipController } from '../ShipController';
import { BaseState } from '../../State Machine/BaseState';
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

    public exit(): void {
        super.exit();
        this.stateTimer = 0;
    }
}


