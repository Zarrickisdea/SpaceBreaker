import { _decorator, Collider2D, Component, Contact2DType, Node, Vec3, PhysicsSystem2D } from 'cc';
import { ShipController } from './ShipController';
import { BulletSpawner } from '../Bullets/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('ShipView')
export class ShipView extends Component {

    @property({ type: Node })
    private bulletSpawnerNode: Node = null;

    private shipController: ShipController = null;
    private bulletSpawner: BulletSpawner = null;
    private collider: Collider2D = null;

    public setShipController(shipController: ShipController): void {
        this.shipController = shipController;
    }

    public getShipController(): ShipController {
        return this.shipController;
    }

    public setShipPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setShipWorldPosition(position: Vec3): void {
        this.node.setWorldPosition(position);
    }

    public setShipParent(parent: Node, keepWorldTransform?: boolean): void {
        this.node.setParent(parent, keepWorldTransform);
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.node.setParent(parentCanvas);
    }

    public getBulletSpawner(): BulletSpawner {
        return this.bulletSpawner;
    }

    public playDeadAnimation(): void {
        this.node.active = false;
    }

    protected onLoad(): void {
        this.collider = this.getComponent(Collider2D);

        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
    }

    protected onEnable(): void {
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider, otherCollider, contact): void {
        this.shipController.getCurrentState().onBeginContact(selfCollider, otherCollider, contact);
    }

    protected update(dt: number): void {
        if (this.shipController) {
            this.shipController.update(dt);
        }
    }

    protected onDisable(): void {
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
}


