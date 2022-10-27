import updatePostUsecase from './update.post.usecase';
import createPostUsecase from './update.post.usecase';
import {IPostsEntity} from "../../entities/post.entity";

test("Teste unitário UpdatePostUsecase", async() => {
    const post: IPostsEntity = {
        "postid": 10,
		"userid": 20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date()
    };
    await createPostUsecase.execute(post);
    const post2: IPostsEntity = {
        "postid": 10,
		"userid": 20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date()
    };
    const post3: IPostsEntity = {
        "postid": 10,
		"userid": 20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date()
    };
    expect(await updatePostUsecase.execute(post2)).toMatchObject(post3);
});