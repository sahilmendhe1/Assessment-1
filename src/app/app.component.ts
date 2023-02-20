import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddbookingComponent } from './addbooking/addbooking.component';
import { ApiService } from './services/api.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: ApiService) { }
  displayedColumns: string[] = ['id', 'movieName', 'noOfTickets', 'date', 'totalAmount', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllBooking();
  }

  openDialog() {
    this.dialog.open(AddbookingComponent, {
      width: '40%',
      height: '62%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllBooking();
      }
    })
  }
  getAllBooking() {
    this.api.getBooking()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = res.length;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error: " + err);
        }
      })
  }

  editBooking(row: any) {
    this.dialog.open(AddbookingComponent, {
      width: '40%',
      height: '62%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllBooking();
      }
    }
    )
  }

  deleteBooking(id: number) {
    this.api.deleteBooking(id)
      .subscribe({
        next: (res) => {
          alert("Booking deleted successfully");
          this.getAllBooking();
        },
        error: (err) => {
          alert("Error: " + err);
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

