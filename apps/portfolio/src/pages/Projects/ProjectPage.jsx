import { useParams } from "react-router-dom";
import { projectMap } from "../../data/projects";
import ProjectDetail from "../../components/projects/ProjectDetail";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projectMap[slug];

  return <ProjectDetail project={project} />;
}