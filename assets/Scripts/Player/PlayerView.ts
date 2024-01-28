import { _decorator, Component, Node, Vec3 } from 'cc';
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

    protected onLoad() {
        this.bulletSpawner = this.bulletSpawnerNode.getComponent(BulletSpawner);
    }
}


