import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum PhysicsLayers {
    Default = 1 << 0,
    Player = 1 << 1,
    Enemy = 1 << 2,
    pBullet = 1 << 3,
    eBullet = 1 << 4,
    Border = 1 << 5,
}

@ccclass('GameConstants')
export class GameConstants extends Component{

    // make this a singleton
    private static instance: GameConstants = null;
    public static getInstance(): GameConstants {
        return this.instance;
    }

    private parentCanvas: Node = null;
    public getParentCanvas(): Node {
        return this.parentCanvas;
    }
    public setParentCanvas(value: Node) {
        this.parentCanvas = value;
    }

    protected onLoad(): void {
        this.parentCanvas = director.getScene().getChildByName('Canvas');
    }
}

