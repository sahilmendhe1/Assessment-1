import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {
    
}
postBooking(data : any) {
  return this.http.post<any>("http://localhost:3000/Bookings/",data)
}

getBooking(){
  return this.http.get<any>("http://localhost:3000/Bookings/")
}
putBooking(data : any,id:number)  {
  return this.http.put<any>("http://localhost:3000/Bookings/"+id,data)

}
deleteBooking(id:number)  {
  return this.http.delete<any>("http://localhost:3000/Bookings/"+id)
}

}
