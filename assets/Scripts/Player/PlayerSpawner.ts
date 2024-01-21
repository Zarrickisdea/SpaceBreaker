import { _decorator, Component, Node, Prefab } from 'cc';
import { PlayerController } from './PlayerController';
import { PlayerModel } from './PlayerModel';
const { ccclass, property } = _decorator;

@ccclass('PlayerSpawner')
export class PlayerSpawner extends Component {

    @property({ type: Prefab })
    private playerPrefab: Prefab = null;

    @property
    private hitsToKill: number = 0;

    @property
    private damage: number = 0;

    @property
    private speed: number = 0;

    private parentCanvas: Node = null;

    private spawnPlayer(): void {
        const playerModel = new PlayerModel(this.hitsToKill, this.damage, this.speed);
        const playerController = new PlayerController(this.playerPrefab, playerModel, this.hitsToKill, this.damage, this.speed);
        playerController.getPlayerView().setPlayerParent(this.parentCanvas);
        playerController.getPlayerView().setPlayerPosition(this.node.position);
    }

    protected onLoad(): void {
        this.parentCanvas = this.node.parent;
    }

    protected start(): void {
        this.spawnPlayer();
    }
}


