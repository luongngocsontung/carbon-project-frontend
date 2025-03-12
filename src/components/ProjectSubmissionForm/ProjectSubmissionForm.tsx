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
    <div>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
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
        <div>
          <label htmlFor="investmentAmount">Investment Amount ($)</label>
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            value={formData.investmentAmount}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType">Project Type</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === CarbonProjectType.REFORESTATION ? 'Reforestation' : 'Renewable Energy'}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
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
