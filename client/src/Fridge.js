import React from "react";
import Magnet from "./Magnet";
import {Socket} from "./Socket";

class Fridge extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            magnets: [],
            isDragging: false,
            currentX:0,
            currentY:0,
            currentMagnet:-1
        };

        this.socket = Socket;
        this.room = props.match.params.room;

        this.socket.emit('JOIN_ROOM', {
            room_id: this.room
        });

        this.socket.on('POPULATE_MAGNETS', function(data){
            populateMagnets(data);
        });

        const populateMagnets = data => {
            !this.isCancelled && this.setState({magnets: data});
        };

        this.onStartDrag = magnet => {
            !this.isCancelled && this.setState({
               isDragging:true,
               currentMagnet:magnet,
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
            this.setState({isDragging:false,currentMagnet:-1});
        };

        this.onDrag = e => {
            if (this.state.isDragging && this.state.currentMagnet !== -1){
                !this.isCancelled && this.setState({
                    currentX: e.nativeEvent.layerX,
                    currentY: e.nativeEvent.layerY
                });
            }
        }

    }
    componentWillUnmount() {
        this.isCancelled = true;
    }
    render(){
        return (
            <div id="fridge" onMouseMove={this.onDrag} onMouseUp={this.onStopDrag} className={(this.state.isDragging ? 'dragging' : '')}>
                <div className="magnet-placeholder" style={{left:this.state.currentX,top:this.state.currentY}}>{this.state.currentMagnet.word}</div>
                {this.state.magnets.map(magnet => {
                    return (
                        <Magnet x={magnet.x}
                                y={magnet.y}
                                key={magnet.id}
                                onMouseDown={() => this.onStartDrag(magnet)}
                                onMouseUp={this.onStopDrag}
                                selected={(this.state.currentMagnet.id === magnet.id ? true : false)}
                                >
                                {magnet.word}

                                </Magnet>
                    )
                })}
            </div>
        );
    }
}

export default Fridge;