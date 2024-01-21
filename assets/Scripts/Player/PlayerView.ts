import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('PlayerView')
export class PlayerView extends Component {

    private playerController: PlayerController = null;

    public setPlayerController(playerController: PlayerController): void {
        this.playerController = playerController;
    }

    public setPlayerPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setPlayerParent(parent: Node): void {
        this.node.setParent(parent);
    }
}


