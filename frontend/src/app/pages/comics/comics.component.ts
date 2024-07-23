import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarvelService } from 'src/app/servives/marvel.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  title='Comics';

  constructor(private marvelSvc:MarvelService, private router:Router) { }
  comics?:Observable<any>;


  ngOnInit() {

    this.getAllComics();
  }

  getAllComics(){
    this.comics= this.marvelSvc.getComics();  
  }

  getComics(id:string){

    this.router.navigate(['/comic/',id]);

  }

  addToFavorites(id: number) {
   this.marvelSvc.addFavorite(id).subscribe(
    response =>{
      alert('Cómic agregado a favoritos');
    }, error => {
      console.error('Login failed', error);
      alert(error.error.error);
    }
   )
  }

}
