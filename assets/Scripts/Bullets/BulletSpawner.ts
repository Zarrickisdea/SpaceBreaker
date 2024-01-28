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

    public getBullet(): BulletController {
        console.log("Searching for available bullet in pool...");
        for (let i = 0; i < this.bulletPool.length; i++) {
            if (!this.bulletPool[i].getBulletView().getIsAlive()) {
                console.log("Bullet found in pool and inactive");
                return this.bulletPool[i];
            }
        }
    
        console.log("No available bullets in pool. Instantiating a new one.");

        const newBulletController = this.spawnBullet();
    
        return newBulletController;
    }

    public returnBulletToPool(bulletController: BulletController): void {
        this.bulletPool.push(bulletController);
    }
    
    public getPoolSize(): number {
        return this.poolSize;
    }

    protected onLoad(): void {
        for (let i = 0; i < this.poolSize; i++) {
            this.spawnBullet();
        }
    }

    private spawnBullet(): BulletController {
        const bulletModel = new BulletModel(this.speed);
        const bulletController = new BulletController(this.bulletPrefab, bulletModel);
        bulletController.getBulletView().setParent(this.node);
        bulletController.setParentSpawner(this);
        bulletController.getBulletView().setAsInactive();
        this.bulletPool.push(bulletController);
        return bulletController;
    }
}


