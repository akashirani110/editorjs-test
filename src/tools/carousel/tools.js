import {default as React} from 'react'
import ReactDOM from 'react-dom'
import ImageCarousel from './carousel';

export default class Carousel{
    static get toolbox() {
        return {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path style="fill:#010101; stroke:none;" d="M0 0L0 24L24 24L24 0L0 0z"/>
          </svg>`,
          title: 'Carousel',
        };
      }
    
    static get isReadOnlySupported() {
        return true;
    }

    constructor({ data, config, api, readOnly, block }) {
        this.api = api;
        this.readOnly = readOnly;
        this.data = {
          urls: data.urls || [],
        };
        this.blockAPI = block
        this.CSS = {
          wrapper: 'image-carousel',
        };
    
        this.nodes = {
          holder: null,
        };
      }

    render() {
        const rootNode = document.createElement('div');
        rootNode.setAttribute('class', this.CSS.wrapper);
        this.nodes.holder = rootNode;
    
        const onDataChange = (newData) => {
          this.data = {
            ...newData
          };
          this.blockAPI.dispatchChange();
        }
    
        ReactDOM.render(
          (
            <ImageCarousel
              onDataChange={onDataChange}
              readOnly={this.readOnly}
              data={this.data} />
          ),
          rootNode);
    
        return this.nodes.holder;
    }

    save() {
      console.log(this.data)
        return this.data.urls;
    }
}