import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servives/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { logginFormModel } from 'src/app/models/logginmodeñs';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {

  username: string = '';
  password: string = '';

  public loginForm: FormGroup = new logginFormModel().formLoggin();


  constructor(private authService: AuthService,
     private router: Router,
    private fb: FormBuilder,
  ) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/comics']);
    });
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        // Guardar el token y redirigir
        localStorage.setItem('token', response.token);
        this.router.navigate(['/comics']);
      }, error => {
        console.error('Login failed', error);
      });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
