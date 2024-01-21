import { _decorator, Component, director, instantiate, Node, Prefab, Vec3 } from 'cc';
import { PlayerModel } from './PlayerModel';
import { PlayerView } from './PlayerView';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController {

    private playerModel: PlayerModel = null;
    private playerView: PlayerView = null;

    constructor(playerViewPrefab: Prefab, playerModel: PlayerModel, hitsToKill: number, damage: number, speed: number) {
        console.log('PlayerController constructor');
        this.playerModel = playerModel;
        console.log('PlayerController constructor 2');
        const playerPrefab = instantiate(playerViewPrefab);
        if (playerPrefab) {
            playerPrefab.setParent(director.getScene().getChildByName('Canvas'));
            playerPrefab.setPosition(new Vec3(0, 0, 0))
            this.playerView = playerPrefab.getComponent(PlayerView);
        }
        console.log('PlayerController constructor 3');
        this.playerView.setPlayerController(this);
        console.log('PlayerController constructor ends');
    }
}


