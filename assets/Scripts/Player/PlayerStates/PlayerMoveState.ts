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
        this.fireBullet();
    }

    public touchEnd(event): void {
        this.controller.changeState(this.controller.getPlayerModel().getState('Idle'));
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

    private fireBullet(): void {
        if (this.stateTimer > 0.5) {
            this.controller.getBulletSpawner().getBullet().FireBullet();
            this.stateTimer = 0;
        }
    }
}


