import { _decorator, Component, Node } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletView')
export class BulletView extends Component {

    private bulletController: BulletController = null;

    public setBulletController(bulletController: BulletController): void {
        this.bulletController = bulletController;
    }
}


