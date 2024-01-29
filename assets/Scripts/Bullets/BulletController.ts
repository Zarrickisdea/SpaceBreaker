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

    public FireBullet(direction: number): void {
        this.bulletView.setParent(this.getParentCanvas());
        this.bulletView.setPosition(this.parentBulletSpawner.node.parent.position);
        this.bulletView.setAsActive();
        this.bulletView.firingBullet(direction);
    }

    public returnBulletToPool(): void {
        this.bulletView.setParent(this.parentBulletSpawner.node);
        this.bulletView.setPosition(this.parentBulletSpawner.node.position);
        this.parentBulletSpawner.returnBulletToPool(this);
        this.bulletView.setAsInactive();
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


