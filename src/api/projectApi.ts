import api from '../clients/axios';
import { CarbonProject, EvaluationResponseData, EvaluationFormData } from '../types/carbonProject';

export const carbonProjectApi = {
  // Get all projects
  getAllProjects: async (): Promise<CarbonProject[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Save a new project
  saveProject: async (projectData: CarbonProject) => {
    api.post('/projects', projectData);
  },

  // Evaluate data
  evaluate: async (data: EvaluationFormData): Promise<EvaluationResponseData> => {
    const response = await api.post('/evaluate', data);
    return response.data;
  },
};

export default carbonProjectApi;
