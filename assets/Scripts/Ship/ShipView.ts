import { _decorator, Collider2D, Component, Contact2DType, Node, Vec3, PhysicsSystem2D, RigidBody2D, RichText, tween, Vec4, Color } from 'cc';
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

    private scoreTween: any = null;
    private scoreOpacityTween: any = null;

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
        console.log('setting ship parent: ' + parent.name);
        this.node.setParent(parent);
        console.log('ship parent set: ' + this.node.parent.name);
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.node.setParent(parentCanvas);
    }

    public getBulletSpawner(): BulletSpawner {
        return this.bulletSpawner;
    }

    public updateScoreUI() {
        if (this.scoreTween && this.scoreOpacityTween) {
            this.scoreTween.stop();
            this.scoreOpacityTween.stop();
            this.scoreTween = null;
            this.scoreOpacityTween = null;
        }
        this.hitsToKillUI.string = this.shipController.getHitsToKill().toString();

        this.scoreTween = tween(this.hitsToKillUI)
        .to(0.5, { fontSize: 50 }, { easing: 'sineOut' })
        .to(0.5, { fontSize: 30 }, { easing: 'sineIn' })
        .start();
    }

    public playDeadAnimation(): void {
        setTimeout(() => {
            this.node.active = false;
        }, 1);
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

        this.rb2d.enabled = true;
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

        setTimeout(() => {
            this.rb2d.enabled = false;
            }, 1);
        
        this.shipController.ShipDestroyedEvent();
    }

    protected onDestroy(): void {
        this.bulletSpawner.destroyAllBullets();
        this.shipController = null;
    }
}


