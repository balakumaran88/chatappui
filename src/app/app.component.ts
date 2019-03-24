import { Component, OnInit,OnDestroy  } from '@angular/core';
import {SocketService} from './services/socket.service'
import {AuthService} from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat application';
  user:string;
  room:string;
  message: string

  constructor(private socket: SocketService, private _authService: AuthService){
    this.socket.newUserJoined().subscribe((data) => {
      console.log(data)
      this.message=`${data.user} - ${data.message}`
    })

    this.socket.left().subscribe((data) => {
      console.log(data)
      this.message=`${data.user} - ${data.message}`
    })
  }

  ngOnInit() {
    
  }

  ngOnDestroy() { 
    
    
   }

   leave() {
    let data = {"user":this.user, "room":this.room}
    this.socket.leaving(data)
   }

  joi(){
    this.socket.joinRoom({user:this.user,room:this.room})
  }
}
