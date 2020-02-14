// import fetch from 'isomorphic-unfetch'
import axios from 'axios';

class RelationRepository {

    static async getSystems () {
        try {
            const res = await axios.get(`http://localhost:5001/relations/systems`)
                // .then(res => {
                //     const systems = res.data();
                //     return systems;
                // })

                return Promise.resolve(await res.data());
            
        } catch (error) {
            return Promise.reject(error);
        }
       
    }

    static async getDatabases (sys) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/systems/${sys}/bd`);
            const bd = await res.json();
            return Promise.resolve(bd);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getSchemas (bd) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/databases/${bd}/schemas`)
                .then( res => {
                    const systems = res.data;
                    return systems;
                })
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getObjects (schema) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/schemas/${schema}/objects`);
            const objects = await res.json();
            return Promise.resolve(objects);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getInfoObject (object) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations?filter=${JSON.stringify(object)}`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getNameObject (object) {
        try{
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/${object.system}/${object.db}/${object.schema}/${object.object}`);
            const obj = await res.json();
            return Promise.resolve(obj);
        }
        catch (error){ 
            return Promise.reject(error);
        }
    }

    static async getValueObject (system, bd, schema, object, name) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/${system}/${bd}/${schema}/${object}/${name}/value`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getValueName (system, bd, schema, object, name) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/${system}/${bd}/${schema}/${object}/${name}/Name`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getEstadistics (system) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/${system}/estadistica`);
            const obj = await res.json();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }
    }


    static async modifyRelationsObject (id, object) {
        try {
            const res = await fetch(`${process.env.RESTURL_SPEAKERS}relations/${id}`, { method: 'PUT', body: JSON.stringify(object), headers: {
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