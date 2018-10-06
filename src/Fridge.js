import React from "react";
import Magnet from "./Magnet";
import { Socket } from "./Socket";
import { view } from 'react-easy-state';
import appStore from './appStore';

class Fridge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      magnets: [],
      isDragging: false,
      currentX: 0,
      currentY: 0,
      offsetX: 0,
      offsetY: 0,
      currentMagnet: -1
    };

    this.socket = Socket;
    this.room = props.match.params.room;

    appStore.unread = 0;
    appStore.messages = [];

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
      let fridgeWidth = document.getElementById('fridge').clientWidth;
      let fridgeHeight = document.getElementById('fridge').clientHeight;
      let doc = document.documentElement;
      let scrollLimit = 100;

      let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (e.nativeEvent.touches) {
        theX = e.nativeEvent.touches[0].clientX;
        theY = e.nativeEvent.touches[0].clientY;
        let theBody = document.body
        if (this.state.isDragging && this.state.currentMagnet !== -1) {
          if (document.documentElement.clientWidth - theX < scrollLimit &&
              fridgeWidth - (document.documentElement.clientWidth + theBody.scrollLeft) > 0 ){
            theBody.scrollLeft += scrollLimit - (document.documentElement.clientWidth - theX);
          }
          if (document.documentElement.clientHeight - theY < scrollLimit &&
              fridgeHeight - (document.documentElement.clientHeight + theBody.scrollTop) > 0){
            theBody.scrollTop += scrollLimit - (document.documentElement.clientHeight - theY);
          }
          if (theX < scrollLimit &&
            theBody.scrollLeft > 0){
            theBody.scrollLeft -= scrollLimit - theX;
          }
          if (theY < scrollLimit  &&
            theBody.scrollTop > 0){
            theBody.scrollTop -= scrollLimit - theY;
          }
        }
      } else {
        theX = e.nativeEvent.clientX;
        theY = e.nativeEvent.clientY;
        if (this.state.isDragging && this.state.currentMagnet !== -1) {
          if (window.innerWidth - theX < (scrollLimit) &&
            fridgeWidth - (window.innerWidth + doc.scrollLeft) > 0){
            doc.scrollLeft += (scrollLimit) - (window.innerWidth - theX);
          }
          if (window.innerHeight - theY < (scrollLimit) &&
            fridgeHeight - (window.innerHeight + doc.scrollTop) > 0){
            doc.scrollTop += (scrollLimit) - (window.innerHeight - theY);
          }
          if (theX < (scrollLimit) &&
              doc.scrollLeft > 0){
            doc.scrollLeft -= (scrollLimit) - theX;
          }
          if (theY < (scrollLimit) &&
             doc.scrollTop > 0){
            doc.scrollTop -= (scrollLimit) - theY;
          }
        }
      }

      left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      theX = theX + left;
      theY = theY + top;

      if (this.state.isDragging && this.state.currentMagnet !== -1) {
        !this.isCancelled && this.setState({
          currentX: theX - this.state.offsetX,
          currentY: theY - this.state.offsetY
        });
      }
    }

  }
  componentDidUpdate(prevProps,prevState){
    if (this.state.isDragging){
      document.body.classList.add('is-dragging');
    }else{
      document.body.classList.remove('is-dragging');
    }
  }
  componentWillUnmount() {
    this.isCancelled = true;
  }
  render() {
    return (
      <div id="fridge-wrapper" ref="fridge">
        <div id="fridge"
          style={{  width:'2200px',height:'2200px'}}
          onMouseUp={this.onStopDrag}
          onMouseMove={this.onDrag}
          onTouchMove={this.onDrag}
          onTouchEnd={this.onStopDrag}>
          <div className="magnet-placeholder" style={{ left: this.state.currentX, top: this.state.currentY }}>{this.state.currentMagnet.word}</div>
          {this.state.magnets.map(magnet => {
            return (
              <Magnet
                draggable
                x={magnet.x}
                y={magnet.y}
                z={magnet.z}
                key={magnet.id}
                onTouchStart={e => this.onStartDrag(e, magnet)}
                onMouseDown={e => this.onStartDrag(e, magnet)}
                onMouseUp={this.onStopDrag}
                onTouchEnd={this.onStopDrag}
                selected={(this.state.currentMagnet.id === magnet.id ? true : false)}>
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