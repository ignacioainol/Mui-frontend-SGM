import axios from 'axios';

class ComparacionRepository {

    static async getObject(sistema) {
        try {
            const response  = await axios.get(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${sistema}/objects`);
            const data = response.data;
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
       
    }

    static async getDatos(arbol) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${arbol.sistema}/${arbol.object}/${arbol.name}`);
            const data = await response.data;
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }    
    }
}

export default ComparacionRepository;