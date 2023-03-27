import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { classColors, classes, gender, races } from "../shared/utility";
import { AzerothAPI } from "../shared/api.client.gen";
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.css']
})

export class ArmoryComponent implements AfterViewInit  {
  readonly _azerothClient : AzerothAPI.Client;
  readonly classColors = classColors;
  readonly classes = classes;
  readonly gender = gender;
  readonly races = races;

  displayedColumns: string[] = ['name', 'race', 'class', 'spec', 'twos', 'threes'];
  public dataSource: MatTableDataSource<AzerothAPI.CharResult> = new MatTableDataSource();
  public searchValue: string = "";
  public error: string = "";
  public loading: boolean = true;
  calls = new Subject();

  loadStart = Date.now();
  time = 0;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  // MatPaginator Outputs
  pageEvent? : PageEvent = new PageEvent();

  constructor(azerothClient : AzerothAPI.Client) {
    this._azerothClient = azerothClient;
    this.loading = false;
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static : false} ) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public changePage(event?:PageEvent) {
    this.pageEvent = event;
    this.search();
    return event;
  }

  public searchButton() {
    if (this.paginator != undefined)
      this.paginator.firstPage();
    this.search();
  }

  public search() {
    this.loadStart = Date.now();
    this.dataSource = new MatTableDataSource();
    this.loading = true;
    this.calls.next(true);
    this._azerothClient.search(this.searchValue, (this.pageEvent?.pageIndex ?? 0) * 10, 10, environment.API_KEY)
      .pipe(
        takeUntil(this.calls),
        delay(250)
      )
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.characters);
        this.dataSource.sort = this.sort;
        this.length = result.count!;
        this.loading = false;
        this.time = Date.now() - this.loadStart;
      },
        error => {
          this.loading = false;
          console.error(error)
        }
      );
  }
}
