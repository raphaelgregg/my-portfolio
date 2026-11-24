import type { EducationDTO } from '../../dtos/educationDTO'
import type { ExperienceDTO, ProjectDTO } from '../../dtos/experienceDTO'
import type { UserDTO } from '../../dtos/userDTO'
import { getDataFromFirebase } from '../../services/firebaseService'

/** A experiência de id "0" guarda os projetos pessoais, não um emprego. */
const PERSONAL_PROJECTS_ID = '0'

export const fetchUser = () => getDataFromFirebase<UserDTO>({ path: 'user' })
export const fetchEducation = () =>
  getDataFromFirebase<EducationDTO[]>({ path: 'education' })
export const fetchExperience = () =>
  getDataFromFirebase<ExperienceDTO[]>({ path: 'experience' })

function isPersonalProjects(experience: ExperienceDTO): boolean {
  return String(experience.id) === PERSONAL_PROJECTS_ID
}

/** Data de saída como timestamp; "presente" conta como hoje. */
function departureTimestamp(experience: ExperienceDTO): number {
  return experience.departureDate === 'presente'
    ? Date.now()
    : new Date(experience.departureDate || 0).getTime()
}

/**
 * Separa as experiências profissionais (da mais recente para a mais antiga)
 * dos projetos pessoais.
 */
export function splitExperience(experiences: ExperienceDTO[] | null): {
  jobs: ExperienceDTO[]
  personalProjects: ProjectDTO[]
} {
  if (!Array.isArray(experiences)) return { jobs: [], personalProjects: [] }

  const jobs = experiences
    .filter((experience) => !isPersonalProjects(experience))
    .sort((a, b) => departureTimestamp(b) - departureTimestamp(a))

  const personalProjects = experiences.find(isPersonalProjects)?.projects ?? []

  return { jobs, personalProjects }
}

export async function fetchPersonalProject(
  projectId: string,
): Promise<ProjectDTO | undefined> {
  const { personalProjects } = splitExperience(await fetchExperience())
  return personalProjects.find((project) => String(project.id) === projectId)
}
