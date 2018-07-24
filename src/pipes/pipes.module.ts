import { NgModule } from '@angular/core';
import { StatusPipe } from './status/status';
@NgModule({
	declarations: [StatusPipe,
    StatusPipe],
	imports: [],
	exports: [StatusPipe,
    StatusPipe]
})
export class PipesModule {}
