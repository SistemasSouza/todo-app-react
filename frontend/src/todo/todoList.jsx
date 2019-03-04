import React from 'react'
import IconButton from '../template/iConButton'

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' onClick={() => props.handleMarkAsDone(todo)} hide={todo.done}></IconButton>
                    <IconButton style='warning' icon='undo' onClick={() => props.handleMarkAsPeding(todo)} hide={!todo.done}></IconButton>
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