import {Component} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // tslint:disable-next-line:ban-types
  user: String;
  // tslint:disable-next-line:ban-types
  room: String;
  // tslint:disable-next-line:ban-types
  messageText: String;
  // tslint:disable-next-line:ban-types
  messageArray: Array<{user: String , message: String }> = [];
  constructor(private chatservice: ChatService){

    this.chatservice.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this.chatservice.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.chatservice.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(){
      this.chatservice.joinRoom({user: this.user, room: this.room});
  }

  leave(){
    this.chatservice.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage()
  {
    this.chatservice.sendMessage({user: this.user, room: this.room, message: this.messageText});
  }
}

