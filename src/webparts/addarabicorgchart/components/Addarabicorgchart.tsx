import * as React from 'react';
import { IAddarabicorgchartProps } from './IAddarabicorgchartProps';
import styles from './Addarabicorgchart.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';
import OrgChart from 'react-orgchart';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { IOrgChartViewerState } from './IOrgChartViewerState';
import { IOrgChartItem, ChartItem } from './IOrgChartItem';
import { IDataNode, OrgChartNode } from './OrgChartNode';
import { default as pnp, ItemAddResult, Web, ConsoleListener } from "sp-pnp-js";



export default class Addarabicorgchart extends React.Component<IAddarabicorgchartProps, {}> {
  public state: IAddarabicorgchartProps;
  constructor(props, context) {
    super(props);

    this.setState({

      orgChartItems: [],
      listName: this.props.listName,
      currentText:"",
      myglobalArray:[],



    });
    this.callalert = this.callalert.bind(this);



    /**
     *
     */
  }
  public acronym(str) {
    var abbr = "";
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
      abbr += str[i].substr(0, 1);
    }
    return abbr;
  }

  public componentDidMount() {
    this.processOrgChartItems();
    var NewISiteUrl = this.props.siteUrl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);


    pnp.sp.profiles.myProperties.get().then(d => {

      var data=JSON.stringify(d);
      for(var i = 0; i < data.length; i++)
      {
         // alert(data[i]['price']);
      }
      //console.log(data);

  });



    var _tems = [];




    webx.currentUser.get().then((user) => {
      console.log("This is user :"+user);
      return user;
  });


  }
  private processOrgChartItems(): void {
    this.readOrgChartItems()
      .then((orgChartItems: IOrgChartItem[]): void => {

        let orgChartNodes: Array<ChartItem> = [];
        let TempGlobal: Array<object> = [];
        var count: number;
        for (count = 0; count < orgChartItems.length; count++) {
          if (orgChartItems[count].Title!="ADDA")
          var getTitle=this.acronym(orgChartItems[count].Title);
        else
        getTitle=orgChartItems[count].Title;

        var obj={
          acc:getTitle,
          name:orgChartItems[count].Title,
        };


        TempGlobal.push(obj);
          orgChartNodes.push(new ChartItem(orgChartItems[count].Id, getTitle, orgChartItems[count].Url, orgChartItems[count].Parent ? orgChartItems[count].Parent.Id : undefined));
        }

        var arrayToTree: any = require('array-to-tree');
        var orgChartHierarchyNodes: any = arrayToTree(orgChartNodes);
        var output: any = JSON.stringify(orgChartHierarchyNodes[0]);

        this.setState({
          orgChartItems: JSON.parse(output),
          myglobalArray:TempGlobal
        });
      });
  }
  private readOrgChartItems(): Promise<IOrgChartItem[]> {
    return new Promise<IOrgChartItem[]>((resolve: (itemId: IOrgChartItem[]) => void, reject: (error: any) => void): void => {
      this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=Title,Id,Url,Parent/Id,Parent/Title&$expand=Parent/Id&$orderby=Parent/Id asc`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: IOrgChartItem[] }> => {
          return response.json();
        })
        .then((response: { value: IOrgChartItem[] }): void => {
          resolve(response.value);
        }, (error: any): void => {
          reject(error);
        });
    });
  }
  public callalert(e)
  {

    var item=this.state.myglobalArray;
    var filteredarray = item.filter(menu =>  menu["acc"] == e.target.innerText);
    console.log("This is fildtered Array : " + filteredarray);
   //alert(e.target.id);
   this.setState({
     currentText:filteredarray[0]["name"],
   });
  }
  private MyNodeComponent = ({ node }) => {
    if (node.url) {
      return (
        <div className="initechNode" onMouseEnter={this.callalert} defaultValue={node.title} id={node.title} >
          <a href={node.url.Url} className={styles.link} onMouseEnter={this.callalert} >{node.title}</a>
        </div>
      );
    }
    else {
      return (
        <div className="initechNode" onClick={this.callalert}  defaultValue={node.title} onMouseEnter={this.callalert}>{node.title}</div>
      );
    }
  }
  public render(): React.ReactElement<IAddarabicorgchartProps> {
    return (
      <div className={styles.addarabicorgchart}>
        <div className={styles.container}>
        <div className="myrows">
          <h3>Organiztion Chart - ADDA </h3>
        </div>
          <div className={styles.row}>
            <div >
              {
                this.state != null && this.state.orgChartItems != null &&
                <OrgChart  tree={this.state.orgChartItems} NodeComponent={this.MyNodeComponent} pan={true} zoom={true} />

              }
            </div>
            <div className="myrow">
             {this.state!=null &&
             <p>{this.state.currentText}</p>
             }
            </div>
          </div>
        </div>
      </div>
    );
  }





}
