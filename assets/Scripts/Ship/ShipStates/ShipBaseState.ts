import { _decorator } from 'cc';
import { ShipController } from '../ShipController';
import { BaseState } from '../../State Machine/BaseState';
import { PhysicsLayers } from '../../Constants/GameConstants';
import { BulletView } from '../../Bullets/BulletView';
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

    public update(deltaTime: number): void {
        this.stateTimer -= deltaTime;
    }

    public onBeginContact(selfCollider, otherCollider, contact): void {

        if (otherCollider.group === PhysicsLayers.pBullet && selfCollider.group === PhysicsLayers.Enemy) {
            this.controller.onHit();

            let bulletView: BulletView = otherCollider.node.getComponent(BulletView);

            if (bulletView) {
                setTimeout(() => {
                    bulletView.setAsInactive();
                }, 1);
            }

            if (this.controller.checkIfDead()) {
                this.controller.changeState(this.controller.getShipModel().getState('Dead'));
            }
        }
    }

    public exit(): void {
        super.exit();
        this.stateTimer = 0;
    }
}


