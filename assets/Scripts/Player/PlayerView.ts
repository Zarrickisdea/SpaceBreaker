import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('PlayerView')
export class PlayerView extends Component {

    private playerController: PlayerController = null;

    constructor() {
        super();
        console.log('PlayerView constructor');
    }

    protected onLoad(): void {
        console.log('PlayerView onLoad');
    }

    public setPlayerController(playerController: PlayerController): void {
        this.playerController = playerController;
    }
}


