import { countries } from '../../constants/country';
import { CarbonProjectType, EvaluationFormData } from '../../types/carbonProject';
import './styles.css';

interface ProjectSubmissionFormProps {
  formData: EvaluationFormData;
  setFormData: React.Dispatch<React.SetStateAction<EvaluationFormData>>;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: Error | null;
}

const PROJECT_TYPES = [
  CarbonProjectType.REFORESTATION,
  CarbonProjectType.RENEWABLE_ENERGY,
] as const;

export function ProjectSubmissionForm({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  error,
}: ProjectSubmissionFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'investmentAmount' ? Number(value) : value,
    }));
  };

  return (
    <div className="project-form-container">
      <form onSubmit={handleSubmit} className="project-form">
        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="projectName" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Investment Amount */}
        <div className="form-group">
          <label htmlFor="investmentAmount" className="form-label">
            Investment Amount ($)
          </label>
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            value={formData.investmentAmount}
            onChange={handleChange}
            min="0"
            required
            className="form-input"
          />
        </div>

        {/* Project Type */}
        <div className="form-group">
          <label htmlFor="projectType" className="form-label">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="form-select"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === CarbonProjectType.REFORESTATION ? 'Reforestation' : 'Renewable Energy'}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Evaluating...' : 'Evaluate Project'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        )}
      </form>
    </div>
  );
}
