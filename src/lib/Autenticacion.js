/* eslint-disable no-unused-vars */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { saveUser } from './Collecction';

// Para crear una cuenta nueva, pasa la dirección de correo
// electrónico y la contraseña del usuario nuevo PAGINA REGISTER
export const registerWithEmail = (email, password, displayName) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
  // updateProfile es una función para actualizar el displayname y sea visible
    .then((usercredentials) => updateProfile(usercredentials.user, { displayName })
    // then esta dentro del updateProfile, para que retorne UserCredentials
    // ya que UptadeProfile no devuelve nada
      .then(() => usercredentials))
    .then((usercredentials) => {
      // console.log(usercredentials);
      const uid = usercredentials.user.uid;
      return saveUser({ userId: uid, email, name: displayName });
    });
};

// para hacer ingreso de la app mediante email y contraseña PAGINA LOGIN
export const signInWithPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// para ingresar a google en ambas paginas
export const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // nos da acceso al Google Access Token. lo podemos usar para acceder al google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // agregamos el signed-in en la informacion del usuario
      const user = result.user;
      window.location.href = '/feed';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // el correo de la cuenta del usuario.
      const email = error.customData.email;
      // la credencial Auth que fue usada.
      const credential = GoogleAuthProvider.credentialFromError(error);
      window.location.href = '/'; // si nos marca error nos manda al home
    });
};
// cerrar sesión
export const signOutUser = () => {
  const auth = getAuth();
  return signOut(auth);
};
