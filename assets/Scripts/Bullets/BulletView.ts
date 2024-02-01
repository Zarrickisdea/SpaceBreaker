import { _decorator, Component, Node, RigidBody2D, tween, Vec3 } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletView')
export class BulletView extends Component {

    private bulletController: BulletController = null;
    private rb2d: RigidBody2D = null;

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

    public setAsActive(direction: number, tweenDuration: number, easingFunction: string): void {
        this.node.active = true;
        this.cancelFiringTween();
        this.firingBullet(direction, tweenDuration, easingFunction);
    }

    public setAsInactive(): void {
        this.node.active = false;
        this.bulletController.returnBulletToPool();
        this.cancelFiringTween(); 
    }

    public destroySelf(): void {
        this.node.destroy();
    }

    public setParent(parent: Node): void {
        // console.log('setting parent: ' + parent.name);
        this.node.setParent(parent);
        // console.log('parent set: ' + this.node.parent.name);
    }

    public getController(): BulletController {
        return this.bulletController;
    }

    public firingBullet(direction: number, tweenDuration: number, easingFunction: string): void {
        this.firingTween = tween(this.node)
            .to(tweenDuration, { position: new Vec3(this.node.position.x, direction * (this.bulletController.getParentCanvasUI().height / 1.5), 0), }, { easing: easingFunction })
            .call(() => {this.setAsInactive();})
            .start();
    }

    protected onLoad(): void {
        this.rb2d = this.node.getComponent(RigidBody2D);
    }

    protected onEnable(): void {
        setTimeout(() => {
        this.rb2d.enabled = true;
        }, 1);
    }

    protected onDisable(): void {
        setTimeout(() => {
            this.rb2d.enabled = false;
            }, 1);
    }

    protected onDestroy(): void {
        this.bulletController = null;
        this.rb2d = null;
    }

    private cancelFiringTween(): void {
        if (this.firingTween) {
            this.firingTween.stop();
            this.firingTween = null;
        }
    }
}


