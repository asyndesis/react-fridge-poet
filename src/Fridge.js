import React from "react";
import Magnet from "./Magnet";
import Chat from "./Chat";
import PopButton from "./PopButton";
import { Socket } from "./Socket";
import { view } from 'react-easy-state';
import appStore from './appStore';

class Fridge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      magnets: [],
      isDragging: false,
      isAndroid:false,
      currentX: 0,
      currentY: 0,
      offsetX: 0,
      offsetY: 0,
      currentMagnet: -1
    };

    this.socket = Socket;
    this.room = props.match.params.room;

    this.socket.emit('JOIN_ROOM', {
      room_id: this.room,
      userName: appStore.userName,
      userColor: appStore.userColor
    });

    this.socket.on('POPULATE_MAGNETS', function (data) {
      populateMagnets(data);
    });

    const populateMagnets = data => {
      !this.isCancelled && this.setState({ magnets: data });
    };

    this.onStartDrag = (e, magnet) => {
      let mag = e.currentTarget;
      let offsetX = (mag.offsetWidth / 2);
      let offsetY = (mag.offsetHeight / 2);

      !this.isCancelled && this.setState({
        isDragging: true,
        currentMagnet: magnet,
        offsetX: offsetX,
        offsetY: offsetY,
        currentX: magnet.x,
        currentY: magnet.y
      });
    };

    this.onStopDrag = e => {
      this.socket.emit('MOVE_MAGNET', {
        magnet_id: this.state.currentMagnet.id,
        x: this.state.currentX,
        y: this.state.currentY
      });
      this.setState({ isDragging: false, currentMagnet: -1 });
    };

    this.onDrag = e => {
      let theX;
      let theY;
      let doc;

      if (this.state.isAndroid){
        doc = this.refs.fridge;
      }else{
        doc = document.documentElement;
      }

      let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      if (e.nativeEvent.touches) {
        theX = e.nativeEvent.touches[0].clientX + left;
        theY = e.nativeEvent.touches[0].clientY + top;
      } else {
        theX = e.nativeEvent.layerX;
        theY = e.nativeEvent.layerY;
      }
      if (this.state.isDragging && this.state.currentMagnet !== -1) {
        !this.isCancelled && this.setState({
          currentX: theX - this.state.offsetX,
          currentY: theY - this.state.offsetY
        });
      }
    }

  }
  componentDidMount(){
    if (navigator.userAgent.indexOf("Android") !== -1){
      this.setState({isAndroid:true});
      document.body.classList.add('android');
    }
  }
  componentWillUnmount() {
    this.isCancelled = true;
  }
  render() {
    return (
      <div id="fridge-wrapper" ref="fridge">
        <div className="pop-panel">
          <div className="pop-panel-inside">
            <Chat/>
            <PopButton icon="fa fa-home" to="/room"/>
            <PopButton icon="fa fa-cog" to="/"/>
          </div>
        </div>
        <div id="fridge"
          onMouseUp={this.onStopDrag}
          onMouseMove={this.onDrag}
          onTouchMove={this.onDrag}
          onTouchEnd={this.onStopDrag} className={(this.state.isDragging ? 'dragging' : '')}>
          <div className="magnet-placeholder" style={{ left: this.state.currentX, top: this.state.currentY }}>{this.state.currentMagnet.word}</div>
          {this.state.magnets.map(magnet => {
            return (
              <Magnet draggable x={magnet.x}
                y={magnet.y}
                key={magnet.id}
                onTouchStart={e => this.onStartDrag(e, magnet)}
                onMouseDown={e => this.onStartDrag(e, magnet)}
                onMouseUp={this.onStopDrag}
                onTouchEnd={this.onStopDrag}
                selected={(this.state.currentMagnet.id === magnet.id ? true : false)}
              >
                {magnet.word}

              </Magnet>
            )
          })}
        </div>
      </div>
    );
  }
}

export default view(Fridge);