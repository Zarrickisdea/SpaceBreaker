import { _decorator, Component, director, instantiate, Node, Prefab, Vec3 } from 'cc';
import { PlayerModel } from './PlayerModel';
import { PlayerView } from './PlayerView';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController {

    private playerModel: PlayerModel = null;
    private playerView: PlayerView = null;

    constructor(playerViewPrefab: Prefab, playerModel: PlayerModel, hitsToKill: number, damage: number, speed: number) {
        this.playerModel = playerModel;

        const playerPrefab = instantiate(playerViewPrefab);
        if (playerPrefab) {
            this.playerView = playerPrefab.getComponent(PlayerView);
        }

        this.playerView.setPlayerController(this);
    }

    public getPlayerView(): PlayerView {
        return this.playerView;
    }
}


