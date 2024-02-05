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
        const delta = event.touch.getUIDelta();
        this.controller.getPlayerView().setPlayerWorldPosition(delta);
    }
}


