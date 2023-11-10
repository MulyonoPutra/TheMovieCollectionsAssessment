import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  ngOnInit(): void {
    this.backdropPath()
  }

    cover!: string;

  backdropPath() {
    // let randomIndex = Math.floor(Math.random() * data.results.length);
    // let randomBackdropPath = data.results[randomIndex].backdrop_path;
    // console.log(randomBackdropPath);
    // return randomBackdropPath;
  }
}
