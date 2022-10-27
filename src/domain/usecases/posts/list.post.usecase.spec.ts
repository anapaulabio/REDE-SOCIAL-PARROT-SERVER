import listPostUsecase from "./list.post.usecase";

test("Teste unitário ListPostUseCase", async() => {
    expect(await listPostUsecase.execute()).toEqual([]);
});