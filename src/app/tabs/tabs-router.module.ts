import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'album',
                children: [
                    {
                        path: '',
                        loadChildren: '../album/album.module#AlbumPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/tabs/home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule { }
