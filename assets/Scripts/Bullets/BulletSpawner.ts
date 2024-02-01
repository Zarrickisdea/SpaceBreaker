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
        if (this.bulletPool) {
            this.bulletPool.push(bulletController);
        }
    }

    public destroyAllBullets(): void {
        this.bulletPool.forEach((bulletController) => {
            bulletController.destroySelf();
        });
    }
    
    public getPoolSize(): number {
        return this.poolSize;
    }

    protected onLoad(): void {
        this.parentCanvas = director.getScene().getChildByName('Canvas');
    }

    protected start(): void {
        for (let i = 0; i < this.poolSize; i++) {
            this.spawnBullet();
        }
    }

    protected onDestroy(): void {
        this.parentCanvas = null;
    }

    private spawnBullet(): BulletController {
        const bulletModel = new BulletModel(this.tweenDuration);
        const bulletController = new BulletController(this.bulletPrefab, bulletModel, this.parentCanvas);
        bulletController.setParentSpawner(this);
        bulletController.getBulletView().setParent(this.node);
        bulletController.getBulletView().setAsInactive();
        this.bulletPool.push(bulletController);
        return bulletController;
    }
}


