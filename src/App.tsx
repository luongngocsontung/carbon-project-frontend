import { useMutation, useQuery } from '@tanstack/react-query';
import ProjectSubmissionForm from './components/ProjectSubmissionForm';
import ProjectTable from './components/ProjectTable';
import { carbonProjectApi } from './api/projectApi';
import EvaluationResults from './components/EvaluationResults';
import { useState } from 'react';
import {
  CarbonProject,
  CarbonProjectType,
  EvaluationFormData,
  EvaluationResponseData,
} from './types/carbonProject';
import './App.css';

const initialFormData: EvaluationFormData = {
  projectName: '',
  location: '',
  investmentAmount: 0,
  projectType: CarbonProjectType.REFORESTATION,
};

function App() {
  const [formData, setFormData] = useState<EvaluationFormData>(initialFormData);
  const [evaluationResult, setEvaluationResult] = useState<CarbonProject | null>(null);

  const { mutate: evaluate, isPending } = useMutation({
    mutationFn: (data: EvaluationFormData) => carbonProjectApi.evaluate(data),
    onSuccess: (data: EvaluationResponseData) => {
      // remove projectType from formData and add it to evaluationResult
      const { projectType, ...rest } = formData;
      setEvaluationResult({ ...data, ...rest });
    },
  });

  const { mutate: saveProject, isPending: isSaving } = useMutation({
    mutationFn: () => {
      if (!evaluationResult) return Promise.reject('No evaluation data');
      return carbonProjectApi.saveProject(evaluationResult);
    },
    onSuccess: async () => {
      // refetch projects
      await refetch();
      // reset formData
      setFormData(initialFormData);
      // reset evaluationResult
      setEvaluationResult(null);
    },
  });

  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return carbonProjectApi.getAllProjects();
    },
  });

  const handleSubmit = () => {
    evaluate(formData);
  };

  const handleSaveProject = async () => {
    saveProject();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Carbon Project Evaluation</h1>
      </header>
      <main className="app-main">
        {/* Project Submission Form */}
        <ProjectSubmissionForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          error={error}
        />
        {/* Evaluation Results */}
        {evaluationResult && (
          <EvaluationResults
            evaluationData={evaluationResult}
            onSave={handleSaveProject}
            isSaving={isSaving}
          />
        )}
        {/* Projects Table */}
        <ProjectTable
          projects={projects || []}
          isLoading={isLoading}
          error={error instanceof Error ? error : null}
        />
      </main>
    </div>
  );
}

export default App;
