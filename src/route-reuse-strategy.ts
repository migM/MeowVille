import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

// I use this approach to fix an issue with the carousel when navigating out and back into the home page which makes the carousel not render. 
// It might be an issue with CoreUI (the package used for the carousel) I couldn't find info on it or a better fix in time, but 
// this was a way I got it to work, by reusing the component rendered on entry
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};
  private readonly homeComponentRoutePath = 'home'; 

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && route.routeConfig.path === this.homeComponentRoutePath;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig && route.routeConfig.path === this.homeComponentRoutePath) {
      this.handlers[this.homeComponentRoutePath] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && route.routeConfig.path === this.homeComponentRoutePath &&
           !!this.handlers[this.homeComponentRoutePath];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (route.routeConfig && route.routeConfig.path === this.homeComponentRoutePath) {
      return this.handlers[this.homeComponentRoutePath] || null;
    }
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
