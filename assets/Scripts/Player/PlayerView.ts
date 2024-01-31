import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, PhysicsSystem2D, IPhysics2DContact, EPhysics2DDrawFlags } from 'cc';
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

    public setPlayerController(playerController: PlayerController): void {
        this.playerController = playerController;
    }

    public setPlayerPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setPlayerWorldPosition(position: Vec3): void {
        this.node.setWorldPosition(position);
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
        console.log('PlayerView playDeadAnimation');
        this.node.active = false;
    }

    protected onLoad() {
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;
    
        this.collider = this.getComponent(Collider2D);
    }

    protected onEnable(): void {
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
    }

    protected onDisable(): void {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected start(): void {
        this.schedule( () => {
            if (this.playerController.getTouchState()) {
                this.playerController.fireBullet();
            }
        }, this.playerController.getPlayerModel().getShootInterval());
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        this.playerController.getCurrentState().onBeginContact(selfCollider, otherCollider, contact);
    }
}


