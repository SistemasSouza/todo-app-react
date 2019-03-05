import React from 'react'
import {connect } from 'react-redux'

import {bindActionCreators} from 'redux'

import IconButton from '../template/iConButton'
import {markAsDone, markAsPeding} from './todoActions'

const TodoList =  props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' onClick={() => props.markAsDone(todo)} hide={todo.done}></IconButton>
                    <IconButton style='warning' icon='undo' onClick={() => props.markAsPeding(todo)} hide={!todo.done}></IconButton>
                    <IconButton style='danger' icon='trash-o' onClick={()=> props.handleRemove(todo)} hide={todo.done}></IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <div>
            <table className='table table-striped mt-4'>
                <thead>
                    <tr>
                        <th>Descrição</th> 
                        <th className='tableActions'>Ações</th> 
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({list: state.todo.list})

const mapDispatchToProps = dispatch => bindActionCreators({markAsDone, markAsPeding}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)