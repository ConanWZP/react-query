import axios from "axios";
import {ITodo} from "../app-types.ts";

class TodoService {

    private URL = 'https://jsonplaceholder.typicode.com/todos'
    async getAll() {
        return axios.get<ITodo[]>(`${this.URL}/?_start0&_limit=5`)
    }
    async getById(id: string) {
       return  axios.get<ITodo>(`${this.URL}/${id}`)
    }
    async create(title: string) {
        return axios.post<any, any, Omit<ITodo, 'id'>>(this.URL, {
            title,
            userId: 1,
            completed: false
        })
    }

}


export default new TodoService()