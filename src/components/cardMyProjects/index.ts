import type { ProjectDTO } from '../../dtos/experienceDTO'
import { techIconFor } from '../../data/techIcons'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { formatMonthYear } from '../../utils/extractFromDate'
import { CompanyThumbnail } from '../cardExperience'
import './styles.css'

function Technologies(technologies: string[] = []) {
  if (technologies.length === 0) return ''

  const items = technologies
    .map((tech) => {
      const icon = techIconFor(tech)
      const image = icon
        ? `<img src="/svg/${esc(icon)}.svg" alt="" onerror="this.remove()" />`
        : ''
      return `<span>${image}${esc(tech)}</span>`
    })
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
    <div class="card-my-project">
      <a href="/project/${esc(id)}">
        <div class="wrapper-card">
          ${CompanyThumbnail(
            title,
            thumbnail,
            'card-project-thumb',
            'Captura de tela do projeto',
          )}

          <div class="info">
            <h3>${esc(title)}</h3>

            <p class="role">${esc(role)}</p>
            <p class="description">${esc(projectDescriptionShort)}</p>

            ${Technologies(technologies)}
          </div>
        </div>

        <div class="footer">
          Desenvolvido em ${esc(formatMonthYear(date))}
        </div>
      </a>
    </div>
  `
}
