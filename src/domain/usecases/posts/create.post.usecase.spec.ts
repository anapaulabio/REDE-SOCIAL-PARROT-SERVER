import { CreatePostUseCase } from './create.post.usecase'
import { PostsRepositories } from '../../../adapter/repositories/posts.repositories';
import { IPostsEntity} from '../../entities/post.entity'

jest.mock("../../../adapter/repositories/posts.repositories");
const PostsRepositoriesMock = PostsRepositories as jest.Mock<PostsRepositories>;

test("Teste unitário PostUsecase", async() => {

    const PostsRepositories = new PostsRepositoriesMock() as jest.Mocked<PostsRepositories>;
    PostsRepositories.create.mockResolvedValue({
		"postid":10,
		"userid":20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date(),
        })
    

    const post: IPostsEntity = {
		"postid": 10,
		"userid": 20,
		"contentText": 'Deus é bom o tempo todo',
		"createdAt":  new Date(),
		"updatedAt":  new Date()
    };

    const createPostUsecase = new CreatePostUseCase(PostsRepositories)
    

    expect(await createPostUsecase.execute(post)).toMatchObject(post)
}) 