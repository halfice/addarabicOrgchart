import { SPHttpClient } from '@microsoft/sp-http';

export interface IAddarabicorgchartProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  orgChartItems: any;
  currentText:string;
  myglobalArray:Array<object>;
}
