
import { Column, GridOption, AngularGridInstance, GridService } from 'angular-slickgrid';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import _ from 'lodash';
import { ConditionalExpr } from '@angular/compiler';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  @ViewChild('grid1', { static: false }) grid1: ElementRef;

  title = 'ngSlick';

  public columnDefinitions: Column[] = [];
  public gridOptions: GridOption = {};
  public dataset: any[] = [];
  grid: any;
  angularGrid: AngularGridInstance;
  gridObj: any;
  dataViewObj: any;
  gridService: GridService;


  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title' },
      { id: 'duration', name: 'Duration (days)', field: 'duration' },
      { id: '%', name: '% Completeng', field: 'percentComplete' },
      { id: 'start', name: 'Start', field: 'start' },
      { id: 'finish', name: 'Finish', field: 'finish' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven' }
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableColumnReorder: false,
      enableHeaderMenu: true,
      enableRowSelection: true,
      enableColumnPicker: true,
      headerButton: {
        onCommand: (e, args) => {
          console.log("header clicked" + args.column);
        }
      }

    };

    this.dataset = [];

    // for demo purpose, let's mock a 100 lines of data
    for (let i = 0; i < 10; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 28));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i, // again VERY IMPORTANT to fill the "id" with unique values
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }
    console.log(this.dataset);
  }
  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;

    // the Angular Grid Instance exposes both Slick Grid & DataView objects
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
    this.gridService = this.angularGrid.gridService;

    // it also exposes all the Services
    // this.angularGrid.resizerService.resizeGrid(10);
  }

  onCellChanged(e, args) {
    console.log("cell changed");
  }

  onCellClicked(e, args) {
    // do something
    console.log('cell clicked' + args.id);
  }

  onHeaderClicked(e, args) {
    console.log('header clicked' + e, args.column.id);

    const selctedValues = _.map(this.dataset, args.column.id);
    const colIndex = this.gridObj.getColumnIndex(args.column.id);
    for (let row = 0; row < 10; row++) {
      let selected = this.gridObj.getCellNode(row, colIndex);
      selected.style.background = 'blue';

    }


  }




}
