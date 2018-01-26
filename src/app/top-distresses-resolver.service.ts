import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { DistressService } from './core';


@Injectable()
export class DistressResolver implements Resolve<any> {
  constructor(private distressService: DistressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let params: {
      orderBy: 'approves',
      limit: 20
    }
    return this.distressService.search(params).map(distresses => {
      if (distresses) {
        return distresses
      } else {
        this.router.navigate(['/'])
        return null
      }
    })
  }
}