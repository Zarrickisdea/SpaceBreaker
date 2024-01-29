import { _decorator, Component, Node, Vec3 } from 'cc';
import { ShipController } from './ShipController';
import { BulletSpawner } from '../Bullets/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('ShipView')
export class ShipView extends Component {

    @property({ type: Node })
    private bulletSpawnerNode: Node = null;

    private shipController: ShipController = null;
    private bulletSpawner: BulletSpawner = null;

    public setShipController(shipController: ShipController): void {
        this.shipController = shipController;
    }

    public setShipPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setShipWorldPosition(position: Vec3): void {
        this.node.setWorldPosition(position);
    }

    public setShipParent(parent: Node): void {
        this.node.setParent(parent);
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.node.setParent(parentCanvas);
    }

    public getBulletSpawner(): BulletSpawner {
        return this.bulletSpawner;
    }

    protected onLoad(): void {
        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
    }

    protected start(): void {
    }
}


