import { ProjectDTO } from "../../dtos/experienceDTO";
import { fetchExperience, getExperienceSortByDateAndMyProjects } from "../home/homeData";


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
