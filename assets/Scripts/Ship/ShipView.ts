import { _decorator, Collider2D, Component, Contact2DType, Node, Vec3, PhysicsSystem2D, RigidBody2D } from 'cc';
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
    private rb2d: RigidBody2D = null;

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
        setTimeout(() => {
        this.node.active = false;
        }, 1);
    }

    protected onLoad(): void {
        this.collider = this.getComponent(Collider2D);
        this.rb2d = this.getComponent(RigidBody2D);

        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
    }

    protected onEnable(): void {
        this.rb2d.enabled = true;
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
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
        this.rb2d.enabled = false;
        this.bulletSpawner.destroyAllBullets();
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
}


