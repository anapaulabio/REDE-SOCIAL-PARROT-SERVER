import { IUsersEntity } from "../../entities/users.entity";
import createUserUsecase from "./create.user.usecase";
import loginUserUsecase from "./login.user.usecase";

test('Teste unitário de loginUserUsecase', async() => {
    const user: IUsersEntity = {
        name: 'John',
        email: 'john@exemplo.com',
        apartment: 200,
        password: '$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC',
        linkdafoto: 'john.jpeg'
    }
    await createUserUsecase.execute(user)
    const user2: IUsersEntity = {
        name: 'John',
        email: 'john@exemplo.com',
        apartment: 200,
        password: '$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC',
        linkdafoto: 'john.jpeg'
    }

    expect(await loginUserUsecase.execute({email: 'john@example', password: '$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC'})).toMatchObject(user2)
})