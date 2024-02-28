import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CatAPIService } from '../../../services/cat-api.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'attribute-chart',
  templateUrl: './cat-chart.component.html',
  styleUrl: './cat-chart.component.scss',
})
export class CatChartComponent implements OnInit {
  constructor(
    private catAPIService: CatAPIService,
    private catNameService: CatNameService,
    private route: ActivatedRoute,
  ) {}

  public chart: any;
  public breed: string = '';

  ngOnInit(): void {
    this.route.queryParams.pipe(first()).subscribe((params: any) => {
      const catName = params.catName
      if (catName) {
        this.catAPIService.getCatByName(catName).subscribe((data: any[]) => {
          const breedData = data[0];
          this.breed = breedData.name;

          // Populate chartData with the required data
          const chartData = [
            breedData.affection_level,
            breedData.dog_friendly,
            breedData.child_friendly,
            breedData.stranger_friendly,
            breedData.vocalisation,
            breedData.intelligence,
          ];
          this.createChart(chartData);
        });
      }
    })
  }

  //builds chart to show cat stats provided in labels
  createChart(chartData: number[]) {
    this.chart = new Chart('MyChart' as any, {
      type: 'radar',
      data: {
        labels: [
          'Overall Affection Level',
          'Dog Friendly',
          'Child Friendly',
          'Stranger Friendly',
          'Vocalisation',
          'Intelligence',
        ],
        datasets: [
          {
            label: 'Personality',
            data: chartData,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            beginAtZero: true,
            min: 0,
            max: 6,
          },
        },
        aspectRatio: 1,
      },
    });
  }
}