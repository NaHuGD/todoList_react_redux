const initState = {
    todos: [],
    filter: 'all' //all,done,undone
}

const createGenId = () => {
    let id = 0
    console.log('id', id)
    return () => {
        return id++
    }
}
const genId = createGenId()

const todoList = (state = initState, action) => {
    switch (action.type) {
        case 'add':
            {
                const todos = [
                    ...state.todos, {
                        id: genId(),
                        title: action.title,
                        complete: false
                    }]
                const stateNew = Object.assign({}, state, {
                    todos: todos
                })
                return stateNew
            }
        case 'update':
            {
                let todosNew = [];
                let todoNew = action.todo
                for (let i = 0; i < state.todos.length; i++) {
                    let curTodo = state.todos[i]
                    if (curTodo.id === todoNew.id) {
                        todosNew.push(todoNew)
                    } else {
                        todosNew.push(curTodo)
                    }
                }
                const stateNew = Object.assign({}, state, {
                    todos: todosNew
                })
                return stateNew
            }
        case 'filter':
            {
                const stateNew = Object.assign({}, state, {
                    filter: action.display
                })
                return stateNew
            }
        default:
            return state
    }
}

export default todoList