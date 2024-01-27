import { _decorator, Component, Node, Prefab } from 'cc';
import { BulletModel } from './BulletModel';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletSpawner')
export class BulletSpawner extends Component {

    @property({ type: Prefab })
    private bulletPrefab: Prefab = null;

    @property
    private speed: number = 0;

    @property
    private poolSize: number = 0;

    private bulletPool: BulletController[] = [];

    private spawnBullet(): void {
        const bulletModel = new BulletModel(this.speed);
        const bulletController = new BulletController(this.bulletPrefab, bulletModel);
        bulletController.getBulletView().setParent(this.node);
        bulletController.getBulletView().setAsInactive();
        this.bulletPool.push(bulletController);
    }

    protected start(): void {
        for (let i = 0; i < this.poolSize; i++) {
            this.spawnBullet();
        }
    }

    public getBullet(): BulletController {
        for (let i = 0; i < this.bulletPool.length; i++) {
            if (!this.bulletPool[i].getBulletView().getIsAlive()) {
                return this.bulletPool[i];
            }
        }
        return null;
    }

    public getPoolSize(): number {
        return this.poolSize;
    }
}


