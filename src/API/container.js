import React,{ Component } from 'react';

function container(getQuery, Target){
    const API = this;
    return (
    class ServerContainer extends Component{
    state = {
        data: null,
        errors: null,
        loading: true
    }

    componentDidMount(){
        this._query()
    }

    _query = () => {
        API.query(
            getQuery(this.props)
        ).then(res => {
            if(res.errors){
                this.setState({ loading: false, errors: res.errors })
            } else {
                this.setState({ loading: false, data: res.data })
            }
        })
    }

    render(){
        const { loading, data, errors } = this.state;
        if(loading){
            return <p>loading...</p>
        }
        if(errors){
            return <p>Error, please try again</p>
        }
        if(data){
            return <Target {...this.props} data={data} refreshContainer={this.refresh} />
        }

    }

    })
}

export default container;