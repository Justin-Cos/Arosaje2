import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NgcCookieConsentModule } from 'ngx-cookieconsent';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [],
    providers: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatSlideToggleModule,
        NgcCookieConsentModule.forRoot({
            cookie: {
                domain: 'localhost',
            },
            position: 'bottom',
            theme: 'classic',
            palette: {
                popup: {
                    background: '#164969',
                },
                button: {
                    background: '#ffe000',
                },
            },
            content: {
                message: 'Ce site utilise des cookies pour vous garantir la meilleure expérience.',
                dismiss: 'Accepter',
                deny: 'Refuser',
                link: 'En savoir plus',
                href: 'lien-vers-votre-page-de-politique-de-confidentialite',
                policy: 'Politique de confidentialité',
            },
            type: 'info',
            onStatusChange: (event: any) => {
                console.log(event);
            },
        }),
    ],
})
export class AppModule { }
