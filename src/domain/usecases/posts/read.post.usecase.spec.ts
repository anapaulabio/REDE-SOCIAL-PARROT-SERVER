import readPostUsecase from "./read.post.usecase";
import createPostUsecase from "./create.post.usecase";
import { IPostsEntity } from "../../entities/post.entity";


test("Teste unitário de PostUseCase", async() => {
    const user: IPostsEntity = {
		"postid": 10,
		"userid": 20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date()
    };
    await createPostUsecase.execute(user)
    const postreturn: IPostsEntity = {
		"postid": 10,
		"userid": 20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date()
    };
    expect(await readPostUsecase.execute({PostId:10})).toContain(postreturn)
})