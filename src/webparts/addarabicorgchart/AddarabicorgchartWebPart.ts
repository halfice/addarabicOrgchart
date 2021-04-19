import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AddarabicorgchartWebPartStrings';
import Addarabicorgchart from './components/Addarabicorgchart';
import { IAddarabicorgchartProps } from './components/IAddarabicorgchartProps';

export interface IAddarabicorgchartWebPartProps {
  listName: string;
  culture:string;

}

export default class AddarabicorgchartWebPart extends BaseClientSideWebPart <IAddarabicorgchartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddarabicorgchartProps> = React.createElement(
      Addarabicorgchart,
      {
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,

        culture:this.context.pageContext.cultureInfo.currentCultureName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
