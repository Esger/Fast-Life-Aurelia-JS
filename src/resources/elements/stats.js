import {
    inject
} from 'aurelia-framework';
import {
    EventAggregator
} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class StatsCustomElement {

    constructor(eventAggregator) {
        this.ea = eventAggregator;
        this.speed = 0;
        this.stackSize = 0;
    }

    addListeners() {
        this.ea.subscribe('stats', response => {
            this.speed = response.speed;
            this.stackSize = response.stackSize;
        });
    }

    attached() {
        this.addListeners();
    }

}