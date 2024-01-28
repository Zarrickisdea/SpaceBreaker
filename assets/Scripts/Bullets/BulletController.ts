import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { BulletModel } from './BulletModel';
import { BulletView } from './BulletView';
import { BulletSpawner } from './BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController {

    private bulletModel: BulletModel = null;
    private bulletView: BulletView = null;
    private parentBulletSpawner: BulletSpawner = null;

    constructor(bulletViewPrefab: Prefab, bulletModel: BulletModel) {
        this.bulletModel = bulletModel;

        const bulletPrefab = instantiate(bulletViewPrefab);
        if (bulletPrefab) {
            this.bulletView = bulletPrefab.getComponent(BulletView);
        }

        this.bulletView.setBulletController(this);
    }

    public getBulletView(): BulletView {
        return this.bulletView;
    }

    public FireBullet(): void {
        this.bulletView.setParent(this.getParentCanvas());
        this.bulletView.setAsActive();
        this.bulletView.firingBullet();
    }

    public returnBulletToPool(): void {
        this.bulletView.setParent(this.parentBulletSpawner.node);
        this.bulletView.setPosition(this.parentBulletSpawner.node.position);
        this.parentBulletSpawner.returnBulletToPool(this);
        console.log("Bullet returned to pool");
        this.bulletView.setAsInactive();
    }

    public setParentSpawner(parentBulletSpawner: BulletSpawner): void {
        this.parentBulletSpawner = parentBulletSpawner;
    }

    public getParentCanvas(): Node {
        return this.parentBulletSpawner.node.parent.parent;
    }

    public getParentCanvasUI(): UITransform {
        return this.getParentCanvas().getComponent(UITransform);

    }
}


