import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io('http://localhost:3001');
 
  joinRoom(data) {
    this.socket.emit('join', data)
  } 
  
  newUserJoined() {
    let observable = new Observable<{user:string,message:string}>(obs => {
      this.socket.on('user', (data) => {
        console.log(data)
        obs.next(data)
      });
      return () =>{this.socket.disconnect();}
    })
    return observable;
  }

  leaving(data) {
    this.socket.emit('leave', data)
  }

  left() {
    let observable = new Observable<{user:string,message:string}>(obs => {
      this.socket.on('left', (data) => {
        console.log(data)
        obs.next(data)
      });
      return () =>{this.socket.disconnect();}
    })
    return observable;
  }
}
