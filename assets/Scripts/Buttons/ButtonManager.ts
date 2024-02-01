import { _decorator, Component, director } from 'cc';
import { ScoreManager } from '../Score/ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonManager')
export class ButtonManager extends Component {

    protected onLoad(): void {
        director.preloadScene('MainScene');
        director.preloadScene('GameOver');
    }

    public startGame(): void {
        director.loadScene('MainScene');
        ScoreManager.getInstance().resetScore();
    }

    public exitGame(): void {
        director.end();
    }

    public mainMenu(): void {
        director.loadScene('Start');
    }
}


