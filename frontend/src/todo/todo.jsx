import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{
    
    constructor(props){
        super(props)
        this.state = {description:'', list:[]}

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPeding = this.handleMarkAsPeding.bind(this)

        this.refresh()
    }

    refresh(){
        axios.get(`${URL}?sort=-createdAt`)
            .then(res => this.setState({...this.state, description:'', list: res.data}))
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
            .then((res)=>this.refresh())
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then((res)=> this.refresh())
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`,{...todo,done:true})
            .then((res) => this.refresh())
    }

    handleMarkAsPeding(todo){
        axios.put(`${URl}/${todo._id}`,{...todo, done:false})
            .then((res) => this.refresh())
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description} 
                handleChange={this.handleChange}
                handleAdd={this.handleAdd}/>
                <TodoList list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPeding={this.handleMarkAsPeding}/>
            </div>
        )
    }
}

