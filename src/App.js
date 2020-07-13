import React, {Component} from 'react';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
    }
}

    componentDidMount() {
       fetch('https://api.github.com/repos/angular/angular/issues')

            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
            })
        });
    }

    render() {

        var { isLoaded, items } = this.state;

        if(!isLoaded){
            return <div>Loading...</div>;
        }
        else {
            return (
            <div>
            <center><h1>Angular Issues List</h1></center>
            <center><h6>(created within the last 7 days)</h6></center>
            {items.filter(item => new Date().getDate() - new Date(item.created_at).getDate() == 4).map((filteredItem) => (
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Issue Name: {filteredItem.title}</h5>
                    <h6 class="card-subtitle mb-2">Issue User Login: {filteredItem.user.login}</h6>
                    <h6 class="card-subtitle mb-2">Assignee Login: {filteredItem.assignees.login}</h6>
                    <p class="card-text">{filteredItem.body}</p>
                </div>
                </div>
            ))}
            </div> 
            )
        }
    }
}

export default App; 