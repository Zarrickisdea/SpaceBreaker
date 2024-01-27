import { _decorator, Component, Node } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletView')
export class BulletView extends Component {

    private bulletController: BulletController = null;

    public setBulletController(bulletController: BulletController): void {
        this.bulletController = bulletController;
    }

    public getIsAlive(): boolean {
        return this.node.active;
    }

    public setAsActive(): void {
        this.node.active = true;
    }

    public setAsInactive(): void {
        this.node.active = false;
    }

    public setParent(parent: Node): void {
        this.node.setParent(parent);
    }

    protected onEnable(): void {

    }
}


