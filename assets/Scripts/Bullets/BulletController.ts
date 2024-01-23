import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { BulletModel } from './BulletModel';
import { BulletView } from './BulletView';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController {

    private bulletModel: BulletModel = null;
    private bulletView: BulletView = null;

    constructor(bulletViewPrefab: Prefab, bulletModel: BulletModel, speed: number) {
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
}


