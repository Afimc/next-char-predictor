import { store } from "../../core/store/store";
import "./Statistics.css";

interface IStatisticsProps {
  statistic: {
    statisticsTitle: string;
    statNoPredictionsLabel: string;
    statInstructions: string;
    contextOrderLabel: string;
    labelOnRandom: string;
  };
}

function Statistics({statistic}: IStatisticsProps) {
    const lastStats = store((s) => s.lastStats);

    const top = lastStats?.top ?? [];
    const contextOrder = lastStats?.contextOrder ?? 0;


  return (
    <div className="statistics-container">
      <h3 className="statistics-title">
        {statistic.statisticsTitle}
        {contextOrder > 0 && (
          <span className="statistics-subtle">  {statistic.contextOrderLabel.replace("{contextOrder}", contextOrder.toString())}</span>
        )}
      </h3>

      <div className="statistics-list">
        {top.length > 0 ? (
          top.map((pred, index) => (
            <div key={index} className="stat-item">
              <div className="stat-header">
                <span className="stat-char">{pred.char}</span>
                <span className="stat-percentage">
                  {(pred.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar"
                  style={{
                    width: `${pred.probability * 100}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="stat-empty">
            <p>{lastStats?.isRandomized ? statistic.labelOnRandom : statistic.statNoPredictionsLabel}</p>
            <span>{lastStats?.isRandomized ? statistic.labelOnRandom : statistic.statInstructions}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
