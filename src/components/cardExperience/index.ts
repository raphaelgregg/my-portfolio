import type { ExperienceDTO } from '../../dtos/experienceDTO'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import './styles.css'

function placeholder(
  name: string | undefined,
  className: string,
  hidden = false,
): string {
  const initial = (name ?? '?').trim().charAt(0).toUpperCase()
  return `<div class="${className} company-thumbnail-placeholder" aria-hidden="true"${hidden ? ' hidden' : ''}>${esc(initial)}</div>`
}

/**
 * Mostra a imagem; sem logo cadastrado, ou se ela falhar ao carregar, mostra a
 * inicial da empresa sobre um degradê.
 */
export function CompanyThumbnail(
  name: string | undefined,
  src: string | undefined,
  className: string,
  altPrefix = 'Logo da empresa',
): string {
  if (!src) return placeholder(name, className)

  return (
    `<img class="${className}" loading="lazy" decoding="async" src="${esc(src)}" alt="${esc(altPrefix)} ${esc(name)}" ` +
    `onerror="this.hidden=true;this.nextElementSibling.hidden=false" />` +
    placeholder(name, className, true)
  )
}

export function CardExperience({
  id,
  thumbnailCompany,
  jobs,
  companyShortName,
  companyOverviewShort,
}: ExperienceDTO) {
  return `
    <div class="card card-link card-experience-job">
      <a href="/experience/${esc(id)}">
        <div class="wrapper-card">
          ${CompanyThumbnail(companyShortName, thumbnailCompany, 'card-experience-thumb')}

          <div class="info">
            <h3>${esc(companyShortName)}</h3>

            <p class="job">${esc(jobs?.[0]?.title)}</p>
            <p class="description limited-lines">${esc(companyOverviewShort)}</p>
          </div>
        </div>
      </a>
    </div>
  `
}
