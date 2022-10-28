import readUserUsecase from "./read.user.usecase";
import createUserUsecase from "./create.user.usecase";
import { IUsersEntity } from "../../entities/users.entity";


test("Teste unitário de readUserUseCase", async() => {
    const user: IUsersEntity = {
		"name": "Venus",
		"email": "joao@exemplo.com",
		"apartment": 40,
		"password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
		"linkdafoto": "linkdafoto.jpeg"
    };
    await createUserUsecase.execute(user)
    const user2: IUsersEntity = {
		"name": "Venus",
		"email": "joao@exemplo.com",
		"apartment": 40,
		"password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
		"linkdafoto": "linkdafoto.jpeg"
    };
    expect(await readUserUsecase.execute({UserId: 0})).toMatchObject(user2)
})