import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
	selector: 'app',
	directives: [
		ROUTER_DIRECTIVES
	],
	providers: [
		ROUTER_PROVIDERS
	],
	styleUrls: ['app/components/app/styles'],
	templateUrl: 'app/components/app/template.html'
})

@RouteConfig([
])

export class AppComponent {
	public title: String = 'APPNAME';
}
