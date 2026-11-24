import type { ExperienceDTO } from '../../dtos/experienceDTO'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import './styles.css'

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
          <img src="${esc(thumbnailCompany)}" alt="Logo da empresa ${esc(companyShortName)}" />

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
