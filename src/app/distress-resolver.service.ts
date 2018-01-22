import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { DistressService } from './core';


@Injectable()
export class DistressResolver implements Resolve<any> {
  constructor(private distressService: DistressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id']
    return this.distressService.getById(id).map(distress => {
      if (distress) {
        return distress
      } else {
        this.router.navigate(['/'])
        return null
      }
    })
  }
}