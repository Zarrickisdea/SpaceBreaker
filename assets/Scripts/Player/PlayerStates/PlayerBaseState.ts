import { _decorator } from 'cc';
import { BaseState } from '../../State Machine/BaseState';
import { PlayerController } from '../PlayerController';
const { ccclass, property } = _decorator;

@ccclass('PlayerBaseState')
export class PlayerBaseState extends BaseState {

    protected controller: PlayerController = null;

    constructor(controller: PlayerController) {
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

    public touchStart(event) { }
    public touchMove(event) { }
    public touchEnd(event) { }
    public touchCancel(event) { }
}


