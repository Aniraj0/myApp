import React from "react";

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [
                {id: 1, title: 'todo1', status: 'done'},
                {id: 2, title: 'todo2', status: 'to-do'},
            ]
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(e, todoId) {
        this.setState({
            todoList: this.state.todoList.map(todo => {
                if(todo.id === todoId) {
                    return {
                        ...todo,
                        title: e.target.value,
                    };
                } else {
                    return todo;
                }
            })
        });
    }
    
    render() {
        console.log("Render", this.state.todoList)
        return <div>
            {this.state.todoList.map(todo => {
                return <div>
                    <input value={todo.title} onChange={(e) => this.handleTitleChange(e, todo.id)} />
                    <button onClick={() => this.handleStatusChange}>flip flop</button>
                </div>
            })}

            <button onClick={() => {
                console.log("Before click", this.state.todoList);
                this.setState({
                    todoList: [...this.state.todoList, {id: this.state.todoList.length, title: '', status: 'done'}]
                }, () => {
                    console.log("After click", this.state.todoList)
                });
            }}>Add todo</button>
        </div>;
    }
}