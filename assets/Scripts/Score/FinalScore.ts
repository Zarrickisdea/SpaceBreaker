import { _decorator, Component, Node, RichText } from 'cc';
import { ScoreKeeper } from './ScoreKeeper';
const { ccclass, property } = _decorator;

@ccclass('FinalScore')
export class FinalScore extends Component {

    @property({ type: Node })
    private scoreKeeperNode: Node = null;

    private scoreKeeper: ScoreKeeper = null;
    private finalScoreUI: RichText = null;

    protected onLoad(): void {
        this.scoreKeeper = this.scoreKeeperNode.getComponent(ScoreKeeper);
        this.finalScoreUI = this.node.getComponent(RichText);
    }

    protected start(): void {
        this.finalScoreUI.string = this.scoreKeeper.getScore().toString();
    }
}


