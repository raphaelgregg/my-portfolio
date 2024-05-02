import { EducationDTO } from "../../dtos/educatioDTO";
import { ExperienceDTO, ProjectDTO } from "../../dtos/experienceDTO";
import { UserDTO } from "../../dtos/userDTO";
import { getDataFromFirebase } from '../../services/firebaseService';

// Função para buscar dados de usuário e educação no Firebase
export async function fetchUser(): Promise<{ userData: UserDTO}> {
    const userDataPromise = await getDataFromFirebase({ path: 'user' });
    console.log("Dados do Firebase/user: ", userDataPromise);

    return { userData: userDataPromise };
}

// Função para buscar dados de experiência e projetos no Firebase
export async function fetchExperience(): Promise<{ experienceData: ExperienceDTO }> {
    const experienceDataPromise = await getDataFromFirebase({ path: 'experience' });
    console.log("Dados do Firebase/experience:", experienceDataPromise);

    return { experienceData: experienceDataPromise };
}

// Função para buscar dados de usuário e educação no Firebase
export async function fetchEducation(): Promise<{ educationData: EducationDTO }> {
    const educationDataPromise = await getDataFromFirebase({ path: 'education' });
    console.log("Dados do Firebase/education: ", educationDataPromise);

    return { educationData: educationDataPromise };
}

interface ExperienceResult {
    experienceJobs: ExperienceDTO[];
    pessoalProjects?: ProjectDTO[]; // Defina o tipo correto para os projetos pessoais
}

// Função para buscar dados de experiência e projetos no Firebase
export function getExperienceSortByDateAndMyProjects(firebaseData:ExperienceDTO): ExperienceResult {
    // Verifica se firebaseData é um array
    if (!Array.isArray(firebaseData)) {
        console.error("Erro: firebaseData não é um array.");
        return { experienceJobs: [] }; // Retorna um objeto vazio como fallback
    }
    
    // Retira a primeira experiência e retorna o array ordenado cronologicamente para a experiência atual
    const sortedJobs = firebaseData.slice(1).sort((a: ExperienceDTO, b: ExperienceDTO) =>
        (b.departureDate === "presente" ? new Date() : new Date(b.departureDate || 0)).getTime() -
        (a.departureDate === "presente" ? new Date() : new Date(a.departureDate || 0)).getTime()
    );

     // Filtrar e mapear os dados de experiência
     const filteredExperienceJobs: ExperienceDTO[] = sortedJobs.map((job: ExperienceDTO) => ({
        id: job.id || "", // Preencha com o valor apropriado
        thumbnailCompany: job.thumbnailCompany || "", // Preencha com o valor apropriado
        company: job.company || "", // Preencha com o valor apropriado
        companyShortName: job.companyShortName || "", // Preencha com o valor apropriado
        url: job.url || "", // Preencha com o valor apropriado
        hireDate: job.hireDate || "", // Preencha com o valor apropriado
        departureDate: job.departureDate || "", // Preencha com o valor apropriado
        companyOverview: job.companyOverview || "", // Preencha com o valor apropriado
        companyOverviewShort: job.companyOverviewShort || "", // Preencha com o valor apropriado
        jobsOverview: job.jobsOverview || "", // Preencha com o valor apropriado
        jobs: job.jobs || [], // Preencha com o valor apropriado ou deixe como um array vazio
        projects: job.projects || [] // Preencha com o valor apropriado ou deixe como um array vazio
    }));

    // Filtrar e mapear os dados de projetos
    let firstExperienceProjects: ProjectDTO[] = [];

    // Encontrar o objeto com id=0 dentro do array firebaseData
    const firstExperience = firebaseData.find((experience) => experience.id.toString() === "0");

    if (firstExperience) {
        firstExperienceProjects = firstExperience.projects.map((project: ProjectDTO) => ({
            id: project.id,
            title: project.title,
            role: project.role,
            projectDescription: project.projectDescription,
            projectDescriptionShort: project.projectDescriptionShort,
            technologies: project.technologies,
            tools: project.tools,
            date: project.date,
            thumbnail: project.thumbnail,
            banner: project.banner,
            prompt: project.prompt,
            projectType: project.projectType,
            developmentDuration: project.developmentDuration
        }));
    }

    console.log("Projetos do primeiro objeto encontrado:", firstExperienceProjects);
    return { experienceJobs: filteredExperienceJobs, pessoalProjects: firstExperienceProjects };
}

export async function getPojectsFindUserByID(projectID: string): Promise<{project: ProjectDTO} | undefined> {
    // RESGATAR TODAS AS EXPERIENCIAS
    const { experienceData } = await fetchExperience();

    // Busca e ordena projetos
    const { pessoalProjects } = getExperienceSortByDateAndMyProjects(experienceData);

    // Encontra o projeto com o ID fornecido
    let project: ProjectDTO | undefined = undefined;

    // Verifica se pessoalProjects não é undefined e se projectID é um valor válido
    if (pessoalProjects && projectID) {
        console.log('Projetos:', pessoalProjects);
        console.log('ID do Projeto:', projectID);
        
        project = pessoalProjects.find(proj => {
            console.log('ID do Projeto na iteração:', proj.id);
            return proj.id.toString() === projectID.toString();
        });
    } else {
        console.log('Não foi possível encontrar o projeto. Verifique se o ID do usuário é válido e se há projetos disponíveis.');
    }

    // Se o projeto for encontrado, retorna um objeto com a chave 'project'
    if (project) {
        return { project };
    } else {
        // Se o projeto não for encontrado, retorna undefined
        return undefined;
    }
}

// Função para buscar dados de experiência e projetos no Firebase
// export async function fetchExperience2(): Promise<{ experienceJobs: CardExperienceDTO[], myProjects: CardMyProjectDTO[] }> {
//     const firebaseData = await getDataFromFirebase({ path: 'experience' });
//     // console.log("Dados do Firebase:", firebaseData);
//     // Retira a primeira experiência e retorna o array ordenado cronologicamente para a experiência atual
//     const sortedJobs = firebaseData.slice(1).sort((a: any, b: any) =>
//         (b.departureDate === "presente" ? new Date() : new Date(b.departureDate || 0)).getTime() -
//         (a.departureDate === "presente" ? new Date() : new Date(a.departureDate || 0)).getTime()
//     );

//     // Filtrar e mapear os dados de experiência
//     const filteredExperienceJobs = sortedJobs.map((job: CardExperienceDTO) => ({
//         companyShortName: job.companyShortName || "",
//         job: job.jobs[0].title || "",
//         companyOverviewShort: job.companyOverviewShort || "",
//         thumbnailCompany: job.thumbnailCompany || "",
//     }));

//     // Filtrar e mapear os dados de projetos
//     const filteredMyProjects = firebaseData[0].projects.map((project: CardMyProjectDTO) => ({
//         title: project.title,
//         role: project.role,
//         projectDescription: project.projectDescription,
//         technologies: project.technologies,
//         date: project.date,
//         thumbnail: project.thumbnail
//     }));

//     return { experienceJobs: filteredExperienceJobs, myProjects: filteredMyProjects };
// }
