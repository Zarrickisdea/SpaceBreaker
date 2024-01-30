import { _decorator } from 'cc';
import { PlayerBaseState } from './PlayerBaseState';
const { ccclass, property } = _decorator;

@ccclass('PlayerDeadState')
export class PlayerDeadState extends PlayerBaseState {

    public enter(): void {
        super.enter();
        this.controller.getPlayerView().playDeadAnimation();
    }

    public exit(): void {
        super.exit();
    }
}


