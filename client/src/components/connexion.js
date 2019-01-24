import React, { Component } from 'react';

class Connexion extends Component{
    constructor(props){
		super(props);
		this.state = {
			pseudo: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({
            pseudo: event.target.value
        });
    }

    handleSubmit(event){
        this.props.socket.emit('message', this.state.pseudo);
        this.props.socket.emit('login', this.state.pseudo);
		event.preventDefault();
    }

    render(){
        return(
            <div className="block_connexion">
            <h1 className="h1_connexion">Connexion</h1>
			<form className="form_connexion" onSubmit={this.handleSubmit}>
				<input className="input_connexion" id="pseudo" value={this.state.pseudo} onChange={this.handleChange} placeholder="entrez un pseudo"/>
				<input className="submit_connexion" type="submit" />
			</form>
            </div>
        )
    }
}
 
export default Connexion;