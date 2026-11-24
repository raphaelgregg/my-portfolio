import type { ProjectDTO } from '../../dtos/experienceDTO'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { formatLongDate } from '../../utils/extractFromDate'
import './styles.css'

function Technologies(technologies: string[] = []) {
  if (technologies.length === 0) return ''

  const items = technologies
    .map(
      (tech) => `
        <span>
          <img src="/svg/${esc(tech)}.svg" alt="" onerror="this.remove()" />
          ${esc(tech)}
        </span>`,
    )
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
          <img loading="lazy" decoding="async" src="${esc(thumbnail)}" alt="Thumbnail do projeto ${esc(title)}" />

          <div class="info">
            <h3>${esc(title)}</h3>

            <p class="role">${esc(role)}</p>
            <p class="description">${esc(projectDescriptionShort)}</p>

            ${Technologies(technologies)}
          </div>
        </div>

        <div class="footer">
          Desenvolvido em ${esc(formatLongDate(date))}
        </div>
      </a>
    </div>
  `
}
