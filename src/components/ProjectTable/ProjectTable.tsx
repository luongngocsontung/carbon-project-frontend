import { CarbonProject } from '../../types/carbonProject';
import './styles.css';

interface ProjectTableProps {
  projects: CarbonProject[];
  isLoading: boolean;
  error: Error | null;
}

const ProjectTable = ({ projects, isLoading, error }: ProjectTableProps) => {
  if (isLoading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error loading projects: {error.message}</div>;
  if (!projects?.length) return <div className="no-data">No projects found</div>;

  return (
    <div className="table-container">
      <h2>Saved Projects</h2>
      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Location</th>
            <th>Investment Amount</th>
            <th>Carbon Credits</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectName}</td>
              <td>{project.location}</td>
              <td>${project.investmentAmount.toLocaleString()}</td>
              <td>{project.carbonCreditsGenerated} tons</td>
              <td>{`${project.estimatedROI.toFixed(2)}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
