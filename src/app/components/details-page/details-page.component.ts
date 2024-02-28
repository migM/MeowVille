
import { Component, OnInit } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  public details = {
    name: '',
    description: '',
    weight: '',
    origin: '',
    wiki: '',
    image: '',
    temperament: '',
    life_span: '',
  };

  constructor(
    private catAPIService: CatAPIService,
    private catNameService: CatNameService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(first()).subscribe((params: any) => {
      const catName = params.catName
      if (catName) {
        this.catAPIService.getCatByName(catName).subscribe((data: any[]) => {
          const catData = data[0];
          this.details = {
            name: catData.name,
            description: catData.description,
            weight: catData.weight.metric,
            origin: catData.origin,
            wiki: catData.wikipedia_url,
            image: catData.image.url,
            temperament: catData.temperament,
            life_span: catData.life_span,
          };
        });
      }
    })
  }

  goBack(): void {
    this.location.back();
  }
}