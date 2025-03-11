import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { carbonProjectApi } from '../../api/projectApi';
import { CarbonProjectType, EvaluationFormData } from '../../types/carbonProject';
import { countries } from '../../constants/country';

const projectTypes = {
  [CarbonProjectType.REFORESTATION]: 'Reforestation',
  [CarbonProjectType.RENEWABLE_ENERGY]: 'Renewable Energy',
};

interface FormData extends Omit<EvaluationFormData, 'projectType'> {
  projectType: CarbonProjectType;
}

export function ProjectSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    location: '',
    investmentAmount: 0,
    projectType: CarbonProjectType.REFORESTATION,
  });

  const {
    mutate: evaluate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: FormData) => carbonProjectApi.evaluate(data),
    onSuccess: (data) => {
      console.log('Evaluation successful:', data);
      // You can add success handling here (e.g., showing a success message)
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    evaluate(formData);
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
      <h2>Project Submission</h2>
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
            required
            min="0"
            step="1000"
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
            {Object.entries(projectTypes).map(([type, name]) => (
              <option key={type} value={type}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isPending}>
          {isPending ? 'Evaluating...' : 'Submit for Evaluation'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-2 text-red-600 text-sm">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        )}
      </form>
    </div>
  );
}
