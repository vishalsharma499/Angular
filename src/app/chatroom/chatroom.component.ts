import { Component } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {
  isFormOpen: boolean = false;

  openForm() {
    console.log('openForm() called, isFormOpen:', this.isFormOpen);
    this.isFormOpen = true;
  }
  
  
  closeForm() {
    console.log('closeForm() called');
    this.isFormOpen = false;
  }
  
}
