<<<<<<< HEAD
import {signIn, signInGoogle} from "../../src/lib/auth.js"
import {signInWithEmailAndPassword, signInGoogle} from "../../src/lib/export.js"

jest.mock("../../src/lib/export.js")

describe('signIn', () => {
    it('a função deve ser chamada uma vez', () => {
      const email = 'email@gmail.com';
      const password = '123456';
      signIn (email, password);
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      });
    });
=======
import {register, signIn, signInGoogle} from "../../src/lib/auth.js"
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getAuth, mockAuth, GoogleAuthProvider, signInWithPopup} from "../../src/lib/export.js"

jest.mock("../../src/lib/export.js")

//teste da função de cadastro//

describe('register', () => {
  it('a função deve ser chamada uma vez', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce();

    const email = 'teste1@teste.com';
    const password = '1234';
    const profileName = 'teste1';
    await register(email, password, profileName);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockAuth.currentUser, {
      displayName: profileName,
    });
  });
});


//teste da função de login com email e senha//

describe("signIn", ()=>{
  it("a função deve ser chamada uma vez", ()=>{
    const email = 'teste@teste.com';
    const password = 'teste123';

    signIn(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
  });
});

// teste da função de login com o google//
describe("signInGoogle", () =>{
  it("a função deve ser chamada uma vez", ()=>{
    signInGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  })
})


>>>>>>> 2496e255b3b4685cbb16bc1710d951b33b83eccc
