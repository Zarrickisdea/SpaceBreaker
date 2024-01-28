import { _decorator } from 'cc';
import { PlayerBaseState } from './PlayerBaseState';
const { ccclass, property } = _decorator;

@ccclass('PlayerIdleState')
export class PlayerIdleState extends PlayerBaseState {

    public enter(): void {
        super.enter();
    }

    public touchMove(event): void {
        this.controller.changeState(this.controller.getPlayerModel().getState('Move'));
    }

    public exit(): void {
        super.exit();
    }
}


