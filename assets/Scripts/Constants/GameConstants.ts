import { _decorator, UITransform } from 'cc';
const { ccclass, property } = _decorator;

export enum PhysicsLayers {
    Default = 1 << 0,
    Player = 1 << 1,
    Enemy = 1 << 2,
    pBullet = 1 << 3,
    eBullet = 1 << 4,
    Border = 1 << 5,
}

export enum Borders {
    Top = 720,
    Bottom = -720,
    Left = -360,
    Right = 360,
}

@ccclass('GameConstants')
export class GameConstants {

    public parentCanvas: Node = null;
    public parentCanvasUITransform: UITransform = null;
    
}


