import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iConButton'

export default props => (
    <div role="form" className='todoForm row'>
        <Grid cols='12 10 10'>
            <input type='text' id='description' className='form-control' placeholder='Adicione uma tarefa' 
            onChange={props.handleChange}
            value={props.description}/>
        </Grid>
        <Grid cols='12 2 2'>
            <IconButton style='primary' icon='plus' onClick={props.handleAdd}></IconButton>
            <IconButton style='info' icon='search' onClick={props.handleSearch}></IconButton>
            <IconButton style='danger' icon='close' onClick={props.handleClear}></IconButton>
        </Grid>
    </div>
)