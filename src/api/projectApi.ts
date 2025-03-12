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
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Evaluate data
  evaluate: async (data: EvaluationFormData): Promise<EvaluationResponseData> => {
    const response = await api.post('/evaluate', data);
    return response.data;
  },
};

export default carbonProjectApi;
