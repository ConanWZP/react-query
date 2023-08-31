import {useQuery} from "@tanstack/react-query";
import todoService from "../services/todo-service.ts";
import { ITodo } from "../app-types.ts";
import { AxiosResponse } from "axios";



const initData: AxiosResponse<ITodo[], any> = {
    config: undefined,
    headers: undefined,
    status: 0,
    statusText: '',
    data: [
        {
            id: 1,
            title: 'asdas',
            completed: false,
            userId: 1
        }
    ]

}

export const useTodos = (/*todoId: number*/) => {
    return useQuery(['todos'],
        () => todoService.getAll(),
        {
            select: ({data}) => data,
            initialData() {
                return initData
            }
        }
    )
    /*return useQuery(['todos', todoId],
        () => todoService.getById(todoId.toString()),
        {
            select: (data) => data.data,
            enabled: !!todoId
        }
    )*/
}