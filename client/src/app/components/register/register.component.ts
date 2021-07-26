import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  user: User = {
    idUser: 0,
    username: '',
    email: '',
    password: ''
  };

  edit: boolean = false;
  registro: boolean = false;

  constructor(private authService: AuthService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.authService.getUser(params.id).
        subscribe(
          res => {
            this.user = res;
            console.log(this.user);
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewUser(){
    delete this.user.idUser;
    this.authService.saveUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          alert('Usuario Registrado');
          this.router.navigate(['/login']);
        },
        err => console.error(err)
      );
  }

}
