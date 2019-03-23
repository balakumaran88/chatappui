import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
//import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io('http://localhost:3001');
}
