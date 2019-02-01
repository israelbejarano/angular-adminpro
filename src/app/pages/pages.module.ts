import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonutComponent } from '../components/grafico-donut/grafico-donut.component';
import { AccoutSettingsComponent } from './account-settings/account-settings.component';


import { ChartsModule } from 'ng2-charts';

//Rutas
import { PAGES_ROUTES } from './pages.routes';
import { PromesasComponent } from './promesas/promesas.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,    // de manera temporal
        GraficoDonutComponent,
        AccoutSettingsComponent,
        PromesasComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    providers: [],
})
export class PagesModule {}