import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent {

  movieForm !: FormGroup;
  actionButton: string = "Save";

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private dialogReg: MatDialogRef<AddbookingComponent>,
    @Inject(MAT_DIALOG_DATA) public editBooking: any) { }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      noOfTickets: ['', Validators.required],
      date: ['', Validators.required],
      totalAmount: []
    });
    if (this.editBooking) {
      this.actionButton = "Update";
      this.movieForm.controls['movieName'].setValue(this.editBooking.movieName);
      this.movieForm.controls['noOfTickets'].setValue(this.editBooking.noOfTickets);
      this.movieForm.controls['date'].setValue(this.editBooking.date);
      this.movieForm.controls['totalAmount'].setValue(this.editBooking.totalAmount);
    }

  }
  addBooking() {
    if (!this.editBooking) {
      if (this.movieForm.valid) {
        this.api.postBooking(this.movieForm.value)
          .subscribe({
            next: (res) => {
              alert("Booking added successfully");
              this.movieForm.reset();
              this.dialogReg.close('save');
            },
            error: () => {
              alert("Error occured");
            }
          })
      }

    }
    else {
      this.updateBooking();
    }
  }

  updateBooking() {
    this.api.putBooking(this.movieForm.value, this.editBooking.id)
      .subscribe({
        next: (res) => {
          alert("Booking updated successfully");
          this.movieForm.reset();
          this.dialogReg.close('update');
        },
        error: () => {
          alert("Error occured");
        }

      })
  }
}
