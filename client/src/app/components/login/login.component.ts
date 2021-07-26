import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  //loginForm: FormGroup | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
