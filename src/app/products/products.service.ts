import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'http://localhost:8080/api/products'

/*------------------------------------------

  --------------------------------------------

  Http Header Options

  --------------------------------------------

  --------------------------------------------*/

  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }



  /*------------------------------------------

  --------------------------------------------

  Created constructor

  --------------------------------------------

  --------------------------------------------*/

  constructor(private httpClient: HttpClient) { }



  /**

   * Write code on Method

   *

   * @return response()

   */

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL )



    .pipe(

      catchError(this.errorHandler)

    )

  }



  /**

   * Write code on Method

   *

   * @return response()

   */

  create(products:Products): Observable<any> {



    return this.httpClient.post(this.apiURL , JSON.stringify(products), this.httpOptions)



    .pipe(

      catchError(this.errorHandler)

    )

  }



  /**

   * Write code on Method

   *
* @return response()

   */

find(_id:object): Observable<any> {



  return this.httpClient.get(this.apiURL +'/'+ _id)



  .pipe(

    catchError(this.errorHandler)

  )
}



/**

 * Write code on Method

 *

 * @return response()

 */

update(_id:object, products:Products): Observable<any> {



  return this.httpClient.put(this.apiURL +'/'+ _id, JSON.stringify(products), this.httpOptions)



  .pipe(

    catchError(this.errorHandler)

  )

}
/**

   * Write code on Method

   *

   * @return response()

   */

delete(_id:object){

  return this.httpClient.delete(this.apiURL +'/'+_id, this.httpOptions)



  .pipe(

    catchError(this.errorHandler)

  )

}



/**

 * Write code on Method

 *

 * @return response()

 */

errorHandler(error:any) {

  let errorMessage = '';

  if(error.error instanceof ErrorEvent) {

    errorMessage = error.error.message;

  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

  }

  return throwError(errorMessage);

}

uploadSignature(vals: any): Observable<any>{
  let data = vals;
  return this.httpClient.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload',data)
}

}


