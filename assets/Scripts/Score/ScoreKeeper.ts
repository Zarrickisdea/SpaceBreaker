import { _decorator, Component, Node } from 'cc';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('ScoreKeeper')
export class ScoreKeeper extends Component {

    @property
    private score: number = 0;

    private scoreManager: ScoreManager = null;

    public addScore(): void {
        this.scoreManager.addScore(this.score);
    }

    public resetScore(): void {
        this.scoreManager.resetScore();
    }

    public getScore(): number {
        return this.scoreManager.getScore();
    }

    protected onLoad(): void {
        this.scoreManager = ScoreManager.getInstance();
    }
}


