import React, { Component } from 'react'
import axios from 'axios'

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPeding = this.handleMarkAsPeding.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleNotificationSuccess = this.handleNotificationSuccess.bind(this);
        this.notificationDOMRef = React.createRef();

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(res => this.setState({ ...this.state, description, list: res.data }))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then((res) => {
                this.refresh()
                this.handleNotificationSuccess('Tarefa inserida!')
            })
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then((res) => {
                this.refresh(this.state.description)
                this.handleNotificationSuccess('Tarefa removida!')
            })
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then((res) => this.refresh(this.state.description),
             this.handleNotificationSuccess('Tarefa finalizada!'))
    }

    handleMarkAsPeding(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then((res) => this.refresh(this.state.description),this.handleNotificationSuccess('Tarefa Reaberta!'))
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleClear() {
        this.refresh()
    }

    handleNotification() {
        return ({
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        })    
    }

    handleNotificationSuccess(message) {
        this.notificationDOMRef.current.addNotification(
            {
                title: "Sucesso",
                message: `${message}`,
                type: "success",
                ...this.handleNotification(),
            }
        );
    }


    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>

                <ReactNotification ref={this.notificationDOMRef} />

                <TodoForm description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />

                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPeding={this.handleMarkAsPeding} />
            </div>
        )
    }
}

