import { type PersonalProject } from '../../data/github-projects'
import type { ProjectDTO } from '../../dtos/experienceDTO'

/** Adapta um projeto do GitHub ao formato que o card de projeto já entende. */
export function toCardProject(project: PersonalProject): ProjectDTO {
  return {
    id: project.slug,
    title: project.name,
    role: project.category,
    projectDescriptionShort: project.summary,
    technologies: project.techs,
    date: project.createdAt,
    thumbnail: project.cover,
  }
}
