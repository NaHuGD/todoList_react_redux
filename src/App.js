import React, { useState } from 'react'
import { connect } from 'react-redux'
import './app.css'

const App = (props) => {
    const todoState = { todo: '' }

    const [state, setState] = useState(todoState)

    const inputValueFn = (e) => {
        setState({
            todo: e.target.value
        })
    }
    const addTodoFn = (e) => {
        // console.log('addProps', props)
        if (state.todo !== '') {
            setState({
                ...state,
                todo: ''
            })
            const { dispatch } = props
            // 保存到todo,redux store
            dispatch({ type: 'add', title: state.todo })
        }
    }

    const removeTodoFn = (todo) => {
        console.log('remove', todo)
        const { dispatch } = props
        const todoNew = Object.assign({}, todo, {
            complete: !todo.complete
        })

        dispatch({
            type: 'update',
            todo: todoNew
        })
    }

    const clickDisplay = (display) => {
        // console.log(display)
        const { dispatch } = props
        dispatch({ type: 'filter', display: display })
    }

    const getTodos = () => {
        const { todos, filter } = props
        let todoFilter = [];
        if (filter === 'all') {
            return todoFilter = todos
        } else if (filter === 'done') {
            return todoFilter = todos.filter((item) => {
                return item.complete === true
            })
        } else if (filter === 'undone') {
            return todoFilter = todos.filter((item) => {
                return item.complete === false
            })
        }
        return todoFilter
    }

    return (
        <div>
            <h1>Todo APP</h1>
            <input type="text" value={state.todo} onChange={inputValueFn} onKeyPress={(e) => { e.nativeEvent.key === "Enter" && addTodoFn() }} />
            <button onClick={(e) => addTodoFn(e)}>新增代辦</button>
            <ul>
                {getTodos().map((item) => {
                    return <li className={item.complete ? "complete" : ""} key={item.id} onClick={() => removeTodoFn(props.todos[item.id])}>{item.title}</li>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "btnActive" : ""} onClick={() => clickDisplay('all')}>全部顯示</button>
                <button className={props.filter === 'done' ? "btnActive" : ""} onClick={() => clickDisplay('done')}>已完成</button>
                <button className={props.filter === 'undone' ? "btnActive" : ""} onClick={() => clickDisplay('undone')}>未完成</button>
            </div>
        </div>
    )
}

export default connect((state) => {
    // console.log('app=>state', state)
    return {
        todos: state.todos,
        filter: state.filter
    }
}, (dispatch) => {
    // console.log('app=>dispatch', dispatch)
    return {
        dispatch: dispatch
    }
})(App)