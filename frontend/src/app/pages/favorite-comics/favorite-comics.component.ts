import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { MarvelService } from 'src/app/servives/marvel.service';

@Component({
  selector: 'app-favorite-comics',
  templateUrl: './favorite-comics.component.html',
  styleUrls: ['./favorite-comics.component.css']
})
export class FavoriteComicsComponent implements OnInit {
  title = 'Comics Favoritos';
  listFavorite: any[] = [];
  allComics: any[] = [];
  filteredComics: any[] = [];

  constructor(private marvelSvc: MarvelService, private router: Router) { }

  ngOnInit() {
    this.loadComicsAndFavorites();
  }

  private loadComicsAndFavorites() {
    forkJoin({
      comics: this.marvelSvc.getComics(),
      favorites: this.marvelSvc.getFavorites()
    }).subscribe(
      results => {
        const allComics = results.comics;
        const listFavorite = results.favorites;

        this.filterFavoriteComics(allComics, listFavorite); // Filtrar cómics favoritos después de haber cargado los favoritos
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  private filterFavoriteComics(allComics: any[], listFavorite: any) {
     this.filteredComics = allComics.filter((comic:any) => listFavorite.favorites.includes(comic.id));
  }

  getComics(id: string) {
    this.router.navigate(['/comic/', id]);
  }

  removeToFavorite(comicId: string): void {
    const comicIdNumber = Number(comicId);

    this.marvelSvc.removeFavorite(comicId).subscribe(
      response => {
        this.listFavorite = this.listFavorite.filter(id => id !== comicIdNumber);
        this.loadComicsAndFavorites();
        alert(response.message + ", en breve se actualizara la lista");
      },
      error => {
        console.error('Error al eliminar comic de favoritos:', error);
      }
    );
  }
}