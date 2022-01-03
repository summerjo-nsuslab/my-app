import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
    public title: string = 'BOXOFFICE';

    public constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.checkURL();
    }

    private checkURL(): any {
        const url = this.router.url;
        const query:string = this.route.snapshot.paramMap.get('query');
    }
}
