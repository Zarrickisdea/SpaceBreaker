import { _decorator, Node, Label, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager {

    private static instance: ScoreManager = null;

    private score: number = 0;
    private scoreUI: Node = null;

    public static getInstance(): ScoreManager {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ScoreManager();
        return this.instance;
    }

    public setScoreUI(scoreUI: Node): void {
        this.scoreUI = scoreUI;
    }

    public addScore(score: number): void {
        this.score += score;
        this.updateScoreUI();
    }

    public getScore(): number {
        return this.score;
    }

    public resetScore(): void {
        this.score = 0;
        this.updateScoreUI();
    }

    private updateScoreUI(): void {
        console.log('updating score UI');
        console.log(this.score);
        // this.scoreUI.getComponent(RichText).string = this.score.toString();
    }
}


