import { _decorator, Collider2D, Component, Contact2DType, Node, Vec3, RigidBody2D, RichText, tween } from 'cc';
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
    private hitsToKillUI: RichText = null;

    private hpTween: any = null;
    private hpOpacityTween: any = null;

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

    public setShipParent(parent: Node): void {
        this.node.setParent(parent);
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.node.setParent(parentCanvas);
    }

    public getBulletSpawner(): BulletSpawner {
        return this.bulletSpawner;
    }

    public updatehpUI() {
        if (this.hpTween && this.hpOpacityTween) {
            this.hpTween.stop();
            this.hpOpacityTween.stop();
            this.hpTween = null;
            this.hpOpacityTween = null;
        }
        this.hitsToKillUI.string = this.shipController.getHitsToKill().toString();

        this.hpTween = tween(this.hitsToKillUI)
        .to(0.5, { fontSize: 50 }, { easing: 'sineOut' })
        .to(0.5, { fontSize: 30 }, { easing: 'sineIn' })
        .start();
    }

    public playDeadAnimation(): void {
        this.node.active = false;
    }

    protected onLoad(): void {
        this.collider = this.node.getComponent(Collider2D);
        this.rb2d = this.node.getComponent(RigidBody2D);

        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
        this.hitsToKillUI = this.node.getChildByName('HitsToKill').getComponent(RichText);
    }

    protected onEnable(): void {
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        // this.rb2d.enabled = true;
        this.hitsToKillUI.string = this.shipController.getHitsToKill().toString();
        // this.hitsToKillUI.fontColor = new Color(255, 255, 255, 0);
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

        // setTimeout(() => {
            // this.bulletSpawner.destroyAllBullets();
        // }, 10);

        // if (this.rb2d) {
        //     setTimeout(() => {
        //         this.rb2d.enabled = false;
        //         }, 1);
        // }

        if (this.shipController) {
            this.shipController.ShipDestroyedEvent();
        }
    }

    protected onDestroy(): void {
        this.shipController = null;
    }
}


