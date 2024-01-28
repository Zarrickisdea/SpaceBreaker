import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletView')
export class BulletView extends Component {

    private bulletController: BulletController = null;

    public setBulletController(bulletController: BulletController): void {
        this.bulletController = bulletController;
    }

    public setPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setWorldPosition(position: Vec3): void {
        this.node.setWorldPosition(position);
    }

    public getIsAlive(): boolean {
        return this.node.active;
    }

    public setAsActive(): void {
        this.node.active = true;
    }

    public setAsInactive(): void {
        this.node.active = false;
    }

    public setParent(parent: Node): void {
        this.node.setParent(parent);
    }

    public firingBullet(): void {
        tween(this.node)
            .by(0.5, { worldPosition: new Vec3(0, this.bulletController.getParentCanvasUI().height, 0) })
            .call(() => this.bulletController.returnBulletToPool())
            .start();
    }

    protected onEnable(): void {
    }

    protected onDisable(): void {
    }
}


