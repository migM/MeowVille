import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'attribute-chart',
  host: {
    '[attr.extra-host-attribute]': 'true',
  },
  templateUrl: './cat-chart.component.html',
  styleUrl: './cat-chart.component.scss',
})
export class CatChartComponent {
  constructor() {}

  ngOninit() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx as any, {
      type: 'radar',
      data: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [
          {
            data: [20, 10, 4, 2],
          },
        ],
      },
      options: {
        scales: {
          r: {
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
      },
    });
  }
}
