import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  formData = {
      name:'',
      email:'',
      message:''
  };

  submitted: boolean = false;


  submitForm(){
    this.submitted = true;
    console.log(this.formData)
  }

}
