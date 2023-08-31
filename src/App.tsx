import {useTodos} from "./hooks/useTodos.ts";
import {useIsFetching, useMutation, useQueryClient} from "@tanstack/react-query";
import {FormEvent, useState} from "react";
import todoService from "./services/todo-service.ts";


function App() {

    /*    const {isLoading, data} = useQuery(['todos'],
            () => todoService.getAll(),
            {
                select: (data) => data.data,
                enabled: true, // - Условие выполнения запроса, например наличия id в Url'e страницы нашего приложения
               // retry: 3, // - количество попыток запроса до показа ошибки
                /!*onError(err) {
                    alert(err)
                },
                onSuccess() {
                    alert('Успех')
                }*!/
            }
        )*/


    //  const todoId = 1
    // const {isLoading, data} = useTodos(todoId)

    // TODO |||| Иногда лучше использовать isFetching
    const {isLoading, data} = useTodos()

    // Для того чтобы обновить данные на клиенте без нажатия F5, можно использовать следующее:
    const queryClient = useQueryClient()

    //  <button onClick={() => queryClient.invalidateQueries(['todos'])}>Upload</button>
    // к примеру мы нажимаем кнопку отправить/сохранить и в функции onClick'a нужно добавить queryClient.invalidateQueries(['todos'])


    const [title, setTitle] = useState('')

    const {mutate} = useMutation(['create todo'],
        (title: string) => todoService.create(title),
        {
            onSuccess() {
                setTitle('')
                alert('Todo created')
            }
        }
    )
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(title)
        mutate(title)
    }

    const countFetching = useIsFetching()

    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15}}>
            <div>
                <h2>Create todo</h2>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }}/>
                    <button>Create todo</button>
                </form>
            </div>
            <div>
                <h2>Quantity of fetching {countFetching}</h2>
                <button onClick={() => queryClient.invalidateQueries(['todos'])}>Upload</button>
                <h1>Todos:</h1>
                {isLoading ?
                    <div>Loading....</div>
                    :
                    data?.length ?
                        data.map(todo => (
                            <div key={todo.id}>
                                <b>{todo.id}:</b> {todo.title}
                            </div>
                        ))
                        :
                        <h1>Data not Found</h1>
                }
            </div>
        </div>
    )
}

export default App
