import { _decorator, instantiate, Node, Prefab, UITransform } from 'cc';
import { BulletModel } from './BulletModel';
import { BulletView } from './BulletView';
import { BulletSpawner } from './BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController {

    private bulletModel: BulletModel = null;
    private bulletView: BulletView = null;
    private parentBulletSpawner: BulletSpawner = null;

    private parentCanvas: Node = null;

    constructor(bulletViewPrefab: Prefab, bulletModel: BulletModel, parentCanvas: Node) {
        this.bulletModel = bulletModel;

        const bulletPrefab = instantiate(bulletViewPrefab);
        if (bulletPrefab) {
            this.bulletView = bulletPrefab.getComponent(BulletView);
        }

        this.bulletView.setBulletController(this);
        this.parentCanvas = parentCanvas;
    }

    public getBulletView(): BulletView {
        return this.bulletView;
    }

    public FireBullet(direction: number, tweenDuration?: number, easingFunction? : string): void {
        // console.log('Firing bullet from: ' + this.parentBulletSpawner.node.parent.name);
        this.bulletView.setParent(this.getParentCanvas());
        this.bulletView.setWorldPosition(this.parentBulletSpawner.node.parent.worldPosition);
        this.bulletView.setAsActive(direction, tweenDuration? tweenDuration : 1, easingFunction? easingFunction : 'linear');
    }

    public returnBulletToPool(): void {
        this.parentBulletSpawner.returnBulletToPool(this);
    }

    public destroySelf(): void {
        this.bulletView.node.active = false;
    }

    public setParentSpawner(parentBulletSpawner: BulletSpawner): void {
        this.parentBulletSpawner = parentBulletSpawner;
    }

    public getParentCanvas(): Node {
        return this.parentCanvas;
    }

    public getParentCanvasUI(): UITransform {
        return this.getParentCanvas().getComponent(UITransform);
    }
}


