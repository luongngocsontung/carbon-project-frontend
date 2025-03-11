import { useQuery } from '@tanstack/react-query';
import ProjectSubmissionForm from './components/ProjectSubmissionForm';
import ProjectTable from './components/ProjectTable';
import { carbonProjectApi } from './api/projectApi';
import './App.css';

function App() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => carbonProjectApi.getAllProjects(),
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Carbon Project Evaluation</h1>
      </header>
      <main className="app-main">
        <ProjectSubmissionForm />
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
