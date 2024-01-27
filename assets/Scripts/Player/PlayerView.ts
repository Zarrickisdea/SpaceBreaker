import { _decorator, Component, instantiate, Node, Prefab, Vec3, EventTarget, Vec2, UITransform } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('PlayerView')
export class PlayerView extends Component {

    private playerController: PlayerController = null;
    private parentCanvas: Node = null;

    public setPlayerController(playerController: PlayerController): void {
        this.playerController = playerController;
    }

    public setPlayerPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setPlayerWorldPosition(position: Vec3): void {
        // console.log("Position: " + this.node.position)
        // console.log("World Position: " + this.node.worldPosition);
        // console.log("Unnecessary math: " + this.node.position.subtract(this.node.worldPosition));
        this.node.setWorldPosition(position);
    }

    public setPlayerParent(parent: Node): void {
        this.node.setParent(parent);
    }

    public getPlayerNode(): Node {
        return this.node;
    }

    public setPlayerPositionFromDelta(delta: Vec2) {
        this.node.setPosition(new Vec3(delta.x, delta.y, 0));
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.parentCanvas = parentCanvas;
    }

    protected update(dt: number): void {
        // if (this.node.position.x > this.parentCanvas.getComponent(UITransform).width / 2) {
        //     this.node.setWorldPosition(new Vec3(this.parentCanvas.getComponent(UITransform).width / 2, this.node.worldPosition.y, 0));
        // }
    }
}


