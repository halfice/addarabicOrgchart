import { SPHttpClient } from '@microsoft/sp-http';

export interface IAddarabicorgchartProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  orgChartItems: any;
  currentText:string;
  myglobalArray:Array<object>;
  pagelcass:string;
  IsArabic: boolean;
  siteurl: string;
  languagelabel:string;
  culture:string;
  headingname:string;
}
