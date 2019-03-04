import React from 'react'
import { HashRouter  as Router, Route, Switch } from "react-router-dom"
import { Redirect } from 'react-router'

import Todo from '../todo/todo'
import About from '../about/about'

export default props => (
    <Router>
        <div>
            <Switch>
                <Route path='/todos' component={Todo} />
                <Route path='/about' component={About} />
                <Route component={Todo} />
            </Switch>
        </div>
    </Router>
)