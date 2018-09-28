import React, { Component } from 'react';
import { view } from 'react-easy-state';
import appStore from './appStore';
import { Socket } from "./Socket";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: [],
      message:'',
      chatOpen:false,
      unread:0,
      isScrolling:true
    };

    this.socket = Socket;
    this.socket.on('USER_JOINED', function (data) {
      populateUsers(data);
    });

    this.socket.on('RECIEVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      !this.isCancelled && this.setState({ messages: [...this.state.messages, data ] });
      if (this.state.isScrolling){
        this.refs.messageList.scrollTop = this.refs.messageList.scrollHeight - this.refs.messageList.clientHeight;
      }
      if (!this.state.chatOpen){
        this.setState(prevState => {
          return {unread: prevState.unread + 1}
        });
      }
    };

    const populateUsers = data => {
      !this.isCancelled && this.setState({ users: data });
    };

    this.toggleChat = e => {
      !this.isCancelled && this.setState({chatOpen: (this.state.chatOpen ? false : true)});
      this.setState({unread:0});
    };

    this.handleKeyPress = e => {
      if (e.key === 'Enter') {
        if (this.state.message.length > 1)
        this.socket.emit('SEND_MESSAGE', {message: this.state.message});
        !this.isCancelled && this.setState({ message: '' });
      }
    }

    this.handleScroll = e => {
      let { refs, props } = this;
      let scrollTop = refs.messageList.scrollTop;
      let maxScrollPosition = refs.messageList.scrollHeight - refs.messageList.clientHeight;
      if (scrollTop == maxScrollPosition){
        !this.isCancelled && this.setState({ isScrolling: true });
      }else{
        !this.isCancelled && this.setState({ isScrolling: false });
      }
    }
  }
  componentWillUnmount() {
    this.isCancelled = true;
  }
  render() {
    return (
      <div className={"pop-button " + (this.state.chatOpen ? 'open' : '')} >
        <div className="pop-button-icon" onClick={this.toggleChat}>
          <i className="fa fa-comment"></i>
          <span style={{display:(this.state.unread == 0 ? 'none': 'block')}} className="badge badge-danger">{this.state.unread}</span>
        </div>
        <div className="pop-button-action">
          <div className="pop-button-panel">
            <div className="chat-panel" onScroll={this.handleScroll} ref="messageList">
              {this.state.messages.map((m,i) => {
                return (
                  <div key={i} className="chat-message">
                    <span className="chat-user" style={{color:m.user.color}} >{m.user.name}: </span>
                    <span> {m.message}</span>
                  </div>
                )
              })}
            </div>
            <div>
            <input type="text" placeholder="..." onKeyPress={this.handleKeyPress} value={this.state.message} onChange={e => this.setState({ message: e.target.value })} className="form-control form-control-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default view(Chat);