import { _decorator, Component, Prefab, Node, director } from 'cc';
import { BulletModel } from './BulletModel';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletSpawner')
export class BulletSpawner extends Component {

    @property({ type: Prefab })
    private bulletPrefab: Prefab = null;

    @property
    private tweenDuration: number = 0;

    @property
    private poolSize: number = 0;

    private bulletPool: BulletController[] = [];
    private parentCanvas: Node = null;

    public getBullet(): BulletController {
        // console.log('getting bullet ' + this.bulletPool.length);
        if (this.bulletPool.length === 0) {
            return this.spawnBullet();
        }
        return this.bulletPool.pop();
    }

    public returnBulletToPool(bulletController: BulletController): void {
        // console.log('returning bullet ' + this.bulletPool.length + ' to ' + this.node.parent.name);
        this.bulletPool.push(bulletController);
    }

    public destroyAllBullets(): void {
        this.bulletPool.forEach(bullet => {
            bullet.getBulletView().destroySelf();
        });
    }
    
    public getPoolSize(): number {
        return this.poolSize;
    }

    protected onLoad(): void {
        this.parentCanvas = director.getScene().getChildByName('Canvas');

        for (let i = 0; i < this.poolSize; i++) {
            this.spawnBullet();
        }
    }

    private spawnBullet(): BulletController {
        const bulletModel = new BulletModel(this.tweenDuration);
        const bulletController = new BulletController(this.bulletPrefab, bulletModel, this.parentCanvas);
        bulletController.getBulletView().setParent(this.node);
        bulletController.setParentSpawner(this);
        bulletController.getBulletView().setAsInactive();
        this.bulletPool.push(bulletController);
        return bulletController;
    }
}


