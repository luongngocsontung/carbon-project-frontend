import { EvaluationResponseData } from '../../types/carbonProject';
import './styles.css';

interface EvaluationResultsProps {
  evaluationData: EvaluationResponseData;
  onSave: () => void;
  isSaving: boolean;
}

export function EvaluationResults({ evaluationData, onSave, isSaving }: EvaluationResultsProps) {
  if (!evaluationData) return null;

  return (
    <div className="evaluation-results">
      <h3>Evaluation Results</h3>
      <div className="results-grid">
        <div className="result-item">
          <label>Carbon Credits Generated:</label>
          <span className="value">{`${evaluationData.carbonCreditsGenerated} tons`}</span>
        </div>
        <div className="result-item">
          <label>Estimated ROI:</label>
          <span className="value">{`${evaluationData.estimatedROI.toFixed(2)}%`}</span>
        </div>
      </div>
      <button onClick={() => onSave()} disabled={isSaving} className="save-button">
        {isSaving ? 'Saving...' : 'Save Project'}
      </button>
    </div>
  );
}
