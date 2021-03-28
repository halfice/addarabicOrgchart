export interface IOrgChartItem {
    Title: string;
    Id: number;
    parent_id: number;
    Url?: string;
    Parent: any;
}

export class ChartItem {
    public id: number;
    public title: string;
    public url: string;
    public parent_id?: number;

    constructor(id: number, title: string, url: string, parent_id?: number) {
        this.id = id;
        this.title = title;
        this.parent_id = parent_id;
        this.url = url;
    }
}