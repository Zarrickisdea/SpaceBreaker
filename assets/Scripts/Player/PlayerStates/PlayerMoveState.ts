import { _decorator, game, Vec3 } from 'cc';
import { PlayerBaseState } from './PlayerBaseState';
const { ccclass, property } = _decorator;

@ccclass('PlayerMoveState')
export class PlayerMoveState extends PlayerBaseState {

    public enter(): void {
        super.enter();
    }

    public touchMove(event): void {
        this.stateTimer += game.deltaTime;
        this.movePlayer(event);
    }

    public touchEnd(event): void {
        this.controller.changeState(this.controller.getPlayerModel().getState('Idle'));
    }

    public onBeginContact(selfCollider, otherCollider, contact): void {
        super.onBeginContact(selfCollider, otherCollider, contact);
    }

    public exit(): void {
        super.exit();
    }

    private movePlayer(event): void {
        let deltaX = event.touch.getUILocationX();
        let deltaY = event.touch.getUILocationY();
        let newPos = new Vec3(deltaX, deltaY, 0);
        this.controller.getPlayerView().setPlayerWorldPosition(newPos);
    }
}


