import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import ListPage from './ListPage.js';
import CreatePage from './CreatePage.js';
import DetailPage from './DetailPage.js';
import DestinationHeader from './DestinationHeader.js';
import DestinationFooter from './DestinationFooter.js';

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <DestinationHeader />
                    <Switch>
                        <Route 
                            path='/' 
                            exact
                            render={(routerProps) => <ListPage {...routerProps} />} 
                        />
                        <Route 
                            path='/create' 
                            exact
                            render={(routerProps) => <CreatePage {...routerProps} />} 
                        />
                        <Route 
                        path='/detail/:id' 
                        exact
                        render={(routerProps) => <DetailPage {...routerProps} />} 
                        />
                    </Switch>
                </Router>
                <DestinationFooter />
            </div>
        )
    }
}