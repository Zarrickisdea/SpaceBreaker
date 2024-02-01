import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, UITransform, RigidBody2D, Vec2, Rect, director } from 'cc';
import { PlayerController } from './PlayerController';
import { BulletSpawner } from '../Bullets/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('PlayerView')
export class PlayerView extends Component {

    @property({ type: Node })
    private bulletSpawnerNode: Node = null;

    private playerController: PlayerController = null;
    private parentCanvas: Node = null;
    private bulletSpawner: BulletSpawner = null;
    private collider: Collider2D = null;
    private rb2d: RigidBody2D = null;
    private bounds: Rect = null;

    private selfBox: Rect = null;

    private minBounds: Vec2;
    private maxBounds: Vec2;

    public setPlayerController(playerController: PlayerController): void {
        this.playerController = playerController;
    }

    public setPlayerPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setPlayerWorldPosition(position: Vec3): void {
        let clampX = Math.min(Math.max(position.x, this.minBounds.x), this.maxBounds.x);
        let clampY = Math.min(Math.max(position.y, this.minBounds.y), this.maxBounds.y);
        this.node.setWorldPosition(new Vec3(clampX, clampY, 0));
    }

    public setPlayerParent(parent: Node): void {
        this.node.setParent(parent);
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.parentCanvas = parentCanvas;
    }

    public getPlayerNode(): Node {
        return this.node;
    }

    public getBulletSpawner(): BulletSpawner {
        return this.bulletSpawner;
    }

    public playDeadAnimation(): void {
        this.node.active = false;
    }

    public setLinearVelocity(velocity: Vec3): void {
        this.rb2d.linearVelocity = new Vec2(velocity.x, velocity.y);
    }

    protected onLoad() {
        this.collider = this.getComponent(Collider2D);
        this.rb2d = this.getComponent(RigidBody2D);
        this.selfBox = this.getComponent(UITransform).getBoundingBox();
    }

    protected onEnable(): void {
        // setTimeout(() => {
        //     this.rb2d.enabled = true;
        //     }, 1);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
    }

    protected start(): void {
        this.bounds = this.parentCanvas.getComponent(UITransform).getBoundingBox();

        this.minBounds = new Vec2(this.bounds.xMin + this.selfBox.width, this.bounds.yMin + this.selfBox.height);
        this.maxBounds = new Vec2(this.bounds.xMax - this.selfBox.width, this.bounds.yMax - this.selfBox.height);

        this.schedule( () => {
            if (this.playerController.getTouchState()) {
                this.playerController.fireBullet();
            }
        }, this.playerController.getPlayerModel().getShootInterval());
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        this.playerController.getCurrentState().onBeginContact(selfCollider, otherCollider, contact);
    }

    protected onDisable(): void {
        // setTimeout(() => {
        //     this.rb2d.enabled = false;
        //     }, 5);
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected onDestroy(): void {
        setTimeout(() => {
            this.playerController = null;
            director.loadScene('GameOver');
        }, 5000);
    }
}


