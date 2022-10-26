import deleteUserUsecase  from './delete.user.usecase'

test("Teste unitário DeleteUserUsecase", async() => {
    const user = {
        UserId: 0
    };
    expect(await deleteUserUsecase.execute(user)).toBeUndefined();
})