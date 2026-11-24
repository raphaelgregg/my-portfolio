import type { ExperienceDTO } from '../../dtos/experienceDTO'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import './styles.css'

/** Sem logo cadastrado, mostra a inicial da empresa. */
export function CompanyThumbnail(
  name: string | undefined,
  src: string | undefined,
  className: string,
): string {
  if (src) {
    return `<img class="${className}" loading="lazy" decoding="async" src="${esc(src)}" alt="Logo da empresa ${esc(name)}" />`
  }
  const initial = (name ?? '?').trim().charAt(0).toUpperCase()
  return `<div class="${className} company-thumbnail-placeholder" aria-hidden="true">${esc(initial)}</div>`
}

export function CardExperience({
  id,
  thumbnailCompany,
  jobs,
  companyShortName,
  companyOverviewShort,
}: ExperienceDTO) {
  return `
    <div class="card-experience-job">
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
