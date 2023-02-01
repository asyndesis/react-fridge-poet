import React, { Component } from "react";
import { view } from "@risingstack/react-easy-state";
import appStore from "./appStore";
import { Socket } from "./Socket";
import PopButton from "./PopButton";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: appStore.messages,
      message: "",
      chatOpen: false,
      unread: appStore.unread,
      isScrolling: true,
    };

    this.socket = Socket;
    this.socket.on("USER_JOINED", function (data) {
      data.type = "joined";
      addMessage(data);
    });

    this.socket.on("USER_LEFT", function (data) {
      data.type = "left";
      addMessage(data);
    });

    this.socket.on("RECIEVE_MESSAGE", function (data) {
      data.type = "message";
      addMessage(data);
    });

    const addMessage = (data) => {
      !this.isCancelled &&
        this.setState({ messages: [...this.state.messages, data] });
      appStore.messages = [...this.state.messages, data];
      if (!this.state.chatOpen) {
        !this.isCancelled &&
          this.setState((prevState) => {
            return { unread: prevState.unread + 1 };
          });
        appStore.unread = this.state.unread;
      }
    };

    this.scrollBottom = () => {
      if (this.state.isScrolling && this.refs.messageList) {
        this.refs.messageList.scrollTop =
          (this.refs.messageList.scrollHeight || 0) -
          this.refs.messageList.clientHeight;
      }
    };

    this.toggleChat = (e) => {
      let open = this.state.chatOpen ? false : true;
      !this.isCancelled && this.setState({ chatOpen: open });
      if (this.state.chatOpen) {
        !this.isCancelled && this.setState({ isScrolling: true });
      } else {
        !this.isCancelled && this.setState({ unread: 0 });
        appStore.unread = 0;
      }
    };

    this.handleKeyPress = (e) => {
      if (e.key === "Enter") {
        if (this.state.message.length > 1)
          this.socket.emit("SEND_MESSAGE", { message: this.state.message });
        !this.isCancelled && this.setState({ message: "" });
      }
    };

    this.handleScroll = (e) => {
      let { refs } = this;
      if (!refs.messageList) {
        return;
      }
      let scrollTop = refs.messageList.scrollTop;
      let maxScrollPosition =
        refs.messageList.scrollHeight - refs.messageList.clientHeight;
      if (scrollTop === maxScrollPosition) {
        !this.isCancelled && this.setState({ isScrolling: true });
      } else {
        !this.isCancelled && this.setState({ isScrolling: false });
      }
    };
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.isCancelled = true;
  }
  componentDidUpdate() {
    if (this.state.chatOpen) {
      this.refs.chatText.focus();
    }
    this.scrollBottom();
  }
  render() {
    return (
      <PopButton
        icon="fa fa-comment"
        className={"pop-button " + (this.state.chatOpen ? "open" : "")}
        alerts={this.state.unread}
        onClick={this.toggleChat}
      >
        <div className="pop-button-panel">
          <div
            className="chat-messages"
            onScroll={this.handleScroll}
            ref="messageList"
          >
            {this.state.messages.map((m, i) => {
              if (m.type === "message") {
                return (
                  <div key={i} className="chat-message">
                    <span className="chat-user" style={{ color: m.user.color }}>
                      {m.user.name}:{" "}
                    </span>
                    <span> {m.message}</span>
                  </div>
                );
              } else {
                return (
                  <div key={i} className="chat-message">
                    <span className="chat-user" style={{ color: m.user.color }}>
                      [{m.user.name} has {m.type} {m.room.name}.]{" "}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <input
              id="chat-text"
              ref="chatText"
              type="text"
              placeholder="..."
              onKeyPress={this.handleKeyPress}
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
              className="form-control form-control-lg"
            />
          </div>
        </div>
      </PopButton>
    );
  }
}

export default view(Chat);
