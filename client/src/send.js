import React, { Component } from 'react';

class Chat extends Component{
	constructor(props){
		super(props);
		this.displayData = [];
		this.displayChannels = [];
		this.state = {
			showdata: this.displayData,
			showchannels: this.displayChannels,
			message: "",
			pseudo: "",
			channels: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChannel = this.handleChannel.bind(this);
		this.SubmitChannel = this.SubmitChannel.bind(this);
	}

	componentDidMount(){
		this.props.socket.on('messages', (test) => {
			this.displayData = test.map((item, index) => {
				return(
					<li key={index}>{item}</li>
				)
			})
				this.setState({
					showdata: this.displayData,
					message: "",
				});
		});
		this.props.socket.on('rooms', (channel) => {
			console.log(channel);
			console.log(this.displayChannels);
			channel.forEach(element => {
				console.log(element);
			});
			this.displayChannels = channel.map((item, index) => {
				return (
					<li className="li_channel" key={index}>
						<a className="link_channel" value={this.state.channels} href={this.state.channels}>#{item}</a>
					</li>
				)
			})
			this.setState({
				showchannels: this.displayChannels,
			})
		});
	}

	handleChange1(event){
		this.setState({
			value: event.target.value,
			pseudo: event.target.value
		});
	}

	handleChange(event){
		this.setState({
			value: event.target.value,
			message: event.target.value,
		});
	}

	handleChannel(event){
		this.setState({
			value: event.target.value,
			channels: event.target.value,
		});
	}

	handleSubmit(event){
		// this.displayData.push(this.state.pseudo + " : " + this.state.message);
		this.props.socket.emit('message', this.state.pseudo + " : " + this.state.message);
		event.preventDefault();
	}

	SubmitChannel(event){
		if(this.state.channels == "")
		{
			return null;
		}else{
			this.displayChannels.push(this.state.channels);
			console.log(this.state.channels);
			this.props.socket.emit('room', this.state.channels);
		}
		// this.props.socket.join(this.displayChannels);
		// this.props.socket.emit('channels', this.state.channels);
			this.setState({
				showchannels: this.displayChannels,
			});
		event.preventDefault();
	}

	render(){
		return(
			<div className="App">
        		<header className="App-header">
				<div className="block_channel">
					<h1 className="h1_connexion">Channels</h1>
					<ul>{this.displayChannels}</ul>
					<form className="form_channel" onSubmit={this.SubmitChannel}>
						<input type="text" placeholder="#my_channel" onChange={this.handleChannel}/>
						<button className="button_channel">Créer un channel</button>
					</form>
				</div>
					<form className="form_chat" onSubmit={this.handleSubmit}>
						<input id="pseudo" onChange={this.handleChange1} placeholder="Entrez un pseudo" />
						<ul id="messages">{this.displayData}</ul>
						<div id="send">
							<input className="input_chat" onChange={this.handleChange} value={this.state.message} placeholder="Entrez un message" />
							<button>send</button>
						</div>
					</form>
        		</header>
      		</div>
		);
	}
}

export default Chat;