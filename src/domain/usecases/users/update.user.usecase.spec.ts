import { IUsersEntity } from "../../entities/users.entity";
import createUserUsecase from "./create.user.usecase";
import updateUserUsecase from "./update.user.usecase";

test("Teste unitário de updateUserUseCase", async () => {
    const user: IUsersEntity = {
        "name": "Venus",
        "email": "venus@exemplo.com",
        "apartment": 40,
        "password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
        "linkdafoto": "linkdafoto.jpeg"
    };
    await createUserUsecase.execute(user)
    const user2: IUsersEntity = {
        "name": "Marina",
        "email": "Marina@exemplo.com",
        "apartment": 401,
        "password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
        "linkdafoto": "linkdafoto.jpeg"
    };
    const user3: IUsersEntity = {
        "name": "Marina",
        "email": "Marina@exemplo.com",
        "apartment": 401,
        "password": "$2b$10$4cYhvynIHe/GfTFIpjaDquCscIwoyezoRTOcRgFAFsGpmgr7cg2oC",
        "linkdafoto": "linkdafoto.jpeg"
    };
    expect(await updateUserUsecase.execute(user2)).toMatchObject(user3)
})