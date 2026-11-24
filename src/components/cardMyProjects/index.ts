import type { ProjectDTO } from '../../dtos/experienceDTO'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { formatMonthYear } from '../../utils/extractFromDate'
import { CompanyThumbnail } from '../cardExperience'
import './styles.css'

function Technologies(technologies: string[] = []) {
  if (technologies.length === 0) return ''

  const items = technologies
    .map((tech) => `<span class="chip">${esc(tech)}</span>`)
    .join('')

  return `<div class="techs">${items}</div>`
}

export function CardMyProject({
  id,
  title,
  role,
  projectDescriptionShort,
  technologies,
  date,
  thumbnail,
}: ProjectDTO) {
  return `
    <article class="project-row">
      <a href="/project/${esc(id)}">
        ${CompanyThumbnail(
          title,
          thumbnail,
          'project-thumb',
          'Captura de tela do projeto',
        )}

        <div class="project-body">
          <h3>${esc(title)}</h3>
          <p class="role">${esc(role)}</p>
          <p class="description">${esc(projectDescriptionShort)}</p>

          ${Technologies(technologies)}
        </div>

        <p class="project-date">Desenvolvido em ${esc(formatMonthYear(date))}</p>
      </a>
    </article>
  `
}
