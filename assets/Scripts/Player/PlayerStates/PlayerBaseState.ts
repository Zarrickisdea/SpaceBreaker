import { _decorator } from 'cc';
import { BaseState } from '../../State Machine/BaseState';
import { PlayerController } from '../PlayerController';
import { BulletView } from '../../Bullets/BulletView';
import { PhysicsLayers } from '../../Constants/GameConstants';
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

    public onBeginContact(selfCollider, otherCollider, contact): void {

        switch (otherCollider.group) {
            case PhysicsLayers.Enemy:
                // this.controller.changeState(this.controller.getPlayerModel().getState('Dead'));
                console.log('PlayerBaseState onBeginContact Enemy');
                break;
            case PhysicsLayers.eBullet:
                console.log('PlayerBaseState onBeginContact eBullet');
                let bulletView: BulletView = otherCollider.node.getComponent(BulletView);
                if (bulletView) {
                    
                    setTimeout(() => {
                        otherCollider.node.active = false;
                    }, 1);

                    this.controller.onEnemyBulletHit();
                }
                break;
            default:
                break;
        }
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


