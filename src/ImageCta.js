
export default class CtaBanner {
    constructor({data, api, config}){
        this.api = api;
        this.data = {
            moduleName: data.moduleName || '',
            anchorName: data.anchorName || '',
            ctaHeader: data.ctaHeader || '',
            ctaBody: data.ctaBody || '',
            cdnDesktopImageUrl: data.cdnDesktopImageUrl || ''
        };
        this.config = config;
        this.ui = {
            title: null,
            nameInput: null,
            nameAnchor: null,
            desktopUploadButton: null,
            desktopUploadInput: null
        };
        this.instanceId = this._randomisedNumber();
    }

    static get toolbox(){
        return{
            title: 'Image CTA',
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`

        }
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('image-cta-build-module');
        $(this.wrapper).append(`
        <div class="image-cta-build-header row">
        <div class="col-xs-12">
            <h3 id="image-cta-build-title-${this.instanceId}" class="image-cta-build-title">${this.data.moduleName || 'Image CTA'}</h3>
        </div>
        <div class="image-cta-build-form form-horizontal">
            <div class="form-group">
                <label for="image-cta-module-name-${this.instanceId}" class="control-label col-xs-2">Module Name*</label>
                <div class="col-xs-4">
                    <input id="image-cta-module-name-${this.instanceId}" class="image-cta-build-input form-control" type="text" value="${this.data.moduleName}" />
                </div>
                <label for="image-cta-module-anchor-${this.instanceId}" class="control-label col-xs-2">Anchor Name</label>
                <div class="col-xs-4">
                    <span id="image-cta-module-anchor-${this.instanceId}" class="image-cta-build-module-name-anchor">#${this.data.moduleName}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="image-cta-desktop-url-${this.instanceId}" class="control-label col-xs-2">Desktop Image Url</label>
                <div class="col-xs-6">
                    <input id="image-cta-desktop-url-${this.instanceId}" class="image-cta-build-input form-control" type="text" value="${this.data.cdnDesktopImageUrl}" />
                </div>
                <div class="col-xs-4">
                    <input id="image-cta-desktop-button-${this.instanceId}" role="button" class="btn btn-success image-cta-build-desktop-image-upload" value="Upload" />
                    <input id="image-cta-desktop-input-${this.instanceId}" type="file" style="display: none;"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-6 col-xs-offset-3">
                    <img src="${this.data.cdnDesktopImageUrl}">Desktop Image Preview</img>
                </div>
            </div>
        </div>
    </div>
        
        `)
        return this.wrapper;
    }

    listeners(){
        this.ui.title = $(`#image-cta-build-title-${this.data.id}`);
        console.log(this.ui.title);
        this.ui.nameInput = $(`#image-cta-module-name-${this.instanceId}`);
        this.ui.nameAnchor = $(`#image-cta-module-anchor-${this.instanceId}`);
        this.ui.desktopUploadButton = $(`#image-cta-desktop-button-${this.instanceId}`);
        this.ui.desktopUploadInput = $(`#image-cta-desktop-input-${this.instanceId}`);
        this.ui.desktopUploadPreview = $(`#image-cta-desktop-preview-${this.instanceId}`);

        this.ui.nameInput.on('input', () => {
            this.ui.title.text(this.ui.nameInput.val() || 'Image CTA');
            const transformedInput = this.ui.nameInput.val().replaceAll(/\s/g, '-');
            this.ui.nameAnchor.text('#' + transformedInput);
        })

        this.ui.desktopUploadButton.on('click', () => {
            this.ui.desktopUploadInput.trigger('click');
        })

        this.ui.desktopUploadInput.on('change', (e) => {
            if(!e.target. files > 0){
                return;
            }
            this._uploadDesktopImage(e.target.files[0]);
        });

        
    }
    _randomisedNumber() {
        let min = Math.ceil(0);
        let max = Math.floor(9999999);

        return Math.trunc(Math.random() * (max - min) + min);
    }

    validate(savedData) {
        if (savedData.moduleName === 'Image CTA' || !savedData.moduleName) {
            return false;
        }
        return true;
    }

    save() {
        return {
            moduleName: this.ui.nameInput.val(),
            anchorName: this.ui.nameAnchor.text(),
            ctaHeader: '',
            ctaBody: '',
            cdnDesktopImageUrl: this.ui.cdnDesktopImageUrl
        }
    }


}