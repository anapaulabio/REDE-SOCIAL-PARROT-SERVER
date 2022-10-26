import { CreateUsersUseCase } from './create.user.usecase'
import { UsersRepository } from '../../../adapter/repositories/users.repository';
import { IUsersEntity } from '../../entities/users.entity'

jest.mock("../../../adapter/repositories/users.repository");
const UsersRepositoryMock = UsersRepository as jest.Mock<UsersRepository>;

test("Teste unitário CreateUsersUsecase", async() => {

    const usersRepository = new UsersRepositoryMock() as jest.Mocked<UsersRepository>;
     usersRepository.create.mockResolvedValue({
		"name": "Venus",
		"email": "joao@exemplo.com",
		"apartment": 40,
		"password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
		"linkdafoto": "linkdafoto.jpeg",
        })
    

    const user: IUsersEntity = {
		"name": "Venus",
		"email": "joao@exemplo.com",
		"apartment": 40,
		"password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
		"linkdafoto": "linkdafoto.jpeg"
    };

    const createUsersUsecase = new CreateUsersUseCase(usersRepository)
    

    expect(await createUsersUsecase.execute(user)).toMatchObject(user)
})
