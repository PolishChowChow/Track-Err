
import { setGenericPassword, resetGenericPassword, getGenericPassword }  from 'react-native-keychain';
import errorHandler from '../queries/errorHandler';


const jwtHandler = {
  setJwt: async (jwt: string) => {
   try{
    await setGenericPassword('jwt', jwt)
   } catch (err) {
    errorHandler(err)
   }
  },
  getJwt: async () => {
    try {
        const credentials = await getGenericPassword();
        return credentials ? credentials.password : null
    } catch (err) {
        errorHandler(err)
    }
  },
  deleteJwt: async () => {
    try {
        await resetGenericPassword();
    } catch (err) {
        errorHandler(err)
    }
  }
};
export default jwtHandler;
