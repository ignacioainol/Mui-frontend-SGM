import axios from 'axios';

class RelationRepository {

    static async getSystems () {
        try {
            const response = await axios.get(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/systems`);
            const data = response.data;

            return Promise.resolve(data[0]);
                  
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getDatabases (sys) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/systems/${sys}/bd`);
            const bd =  response.data;
            return Promise.resolve(bd);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getSchemas (bd) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/databases/${bd}/schemas`)
            const schemas = response.data;
            return Promise.resolve(schemas);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getObjects (schema) {
        try {
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/schemas/${schema}/objects`);
            const objects = await res.json();
            return Promise.resolve(objects);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getInfoObject (object) {
        try {
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations?filter=${JSON.stringify(object)}`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getNameObject (object) {
        try{
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${object.system}/${object.db}/${object.schema}/${object.object}`);
            const obj = await res.json();
            return Promise.resolve(obj);
        }
        catch (error){ 
            return Promise.reject(error);
        }
    }

    static async getValueObject (system, bd, schema, object, name) {
        try {
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${system}/${bd}/${schema}/${object}/${name}/value`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getValueName (system, bd, schema, object, name) {
        try {
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${system}/${bd}/${schema}/${object}/${name}/Name`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getEstadistics (system) {
        try {
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${system}/estadistica`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }


    static async modifyRelationsObject (id, object) {
        try {
            const res = await fetch(`${process.env.REACT_APP_RESTURL_SPEAKERS}relations/${id}`, { method: 'PUT', body: JSON.stringify(object), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              } });
            return Promise.resolve({});
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default RelationRepository;