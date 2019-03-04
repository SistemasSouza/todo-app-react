import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iConButton'
import { changeDescription, search,add } from './todoActions'


class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount(){
        this.props.search()
    }

    keyHandler(e) {
        const {add, search, description} = this.props

        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    render() {
        const {add, search, description} = this.props

        return (
            <div role="form" className='todoForm row'>
                <Grid cols='12 10 10'>
                    <input type='text' id='description' className='form-control' placeholder='Adicione uma tarefa'
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        value={this.props.description} />
                </Grid>
                <Grid cols='12 2 2'>
                    <IconButton style='primary' icon='plus' onClick={() => add(description)}></IconButton>
                    <IconButton style='info' icon='search' onClick={()=> search()}></IconButton>
                    <IconButton style='danger' icon='close' onClick={this.props.handleClear}></IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })

const mapDispatchToProps = dispatch => (bindActionCreators({ changeDescription, search, add }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)