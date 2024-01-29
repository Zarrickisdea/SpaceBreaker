import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletView')
export class BulletView extends Component {

    private bulletController: BulletController = null;

    private firingTween: any = null;

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

    public firingBullet(direction: number, tweenDuration: number, easingFunction: string): void {
        // const duration = tweenDuration !== undefined ? tweenDuration : 1;
        this.firingTween = tween(this.node)
            .to(tweenDuration, { position: new Vec3(this.node.position.x, direction * this.bulletController.getParentCanvasUI().height, 0), }, { easing: easingFunction.toString()})
            .call(() => this.bulletController.returnBulletToPool())
            .start();
    }

    protected onEnable(): void {
    }
}


