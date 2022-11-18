import { defineComponent } from '@/casimir-framework/all';
import { VexImage } from '@/plugins/VuetifyExtended';
import { VImg, } from 'vuetify/lib/components';

const audioExtensions = require('audio-extensions');
const imageExtensions = require('image-extensions');
const videoExtensions = require('video-extensions');


export default defineComponent({
  name: 'AssetFile',

  components: {
    // VexImage,
    VImg,
  },

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    },
    textAlign: {
      type: String,
      default: "center"
    },
    height: {
      type: String,
      default: "200px"
    },
    width: {
      type: String,
      default: "100%"
    },
    isDownloadShown: {
      type: Boolean,
      default: false
    }
  },

  computed: {

    file() {
      const { attributes } = this.schemaData.data;
      const arr = Object.keys(attributes).reduce((arr, key) => {
        return [...arr, { attributeId: key, value: attributes[key] }];
      }, []);

      const file = this.$attributes.getMappedData('nftItem.file', arr);
      return file
    },

    isImg() {
      const file = this.file;
      if (!file) return null;
      const ext = this.getExtension(file.value);
      return imageExtensions.some((e) => e == ext);
    },

    isVideo() {
      const file = this.file;
      if (!file) return null;
      const ext = this.getExtension(file.value);
      return videoExtensions.some((e) => e == ext) || ext.toLowerCase() == 'mov'
    },

    isUnsupportedVideo() {
      const file = this.file;
      if (!file) return null;
      const ext = this.getExtension(file.value);
      return ext.toLowerCase() == 'mov';
    },

    isAudio() {
      const file = this.file;
      if (!file) return null;
      const ext = this.getExtension(file.value);
      return audioExtensions.some((e) => e == ext && ext != 'mp4');
    },

    isPreviewUnavailable() {
      return this.isUnsupportedVideo || (!this.isVideo && !this.isAudio && !this.isImg)
    },

    contentClass() {
      const { smAndDown } = this.$vuetify.breakpoint;
      return smAndDown ? "responsive-img-w-300px" : ""
    },
  },

  methods: {
    getExtension(filename) {
      return filename.split(".").pop();
    },

    getFileUrl(download = false) {
      const { nftCollectionId, nftItemId } = this.schemaData.data;
      const file = this.file;
      if (!file) return null;

      const scopeId = JSON.stringify({
        nftCollectionId: nftCollectionId,
        nftItemId: nftItemId
      });

      return this.$attributes.getFileSrc({
        scope: 'nftItem',
        scopeId,
        attributeId: file.attributeId,
        filename: file.value,
        download: download
      });
    },

  },

  render() {

      return <div class={this.contentClass} style={{ "text-align": this.textAlign, "height": this.height, "width": this.width }}>
        
        { 
          this.isVideo && !this.isPreviewUnavailable
            ? <video width={this.width} height={this.height} controls>
                <source src={this.getFileUrl()} type="video/mp4" />
                <source src={this.getFileUrl()} type="video/ogg" />
                <source src={this.getFileUrl()} type="video/quicktime" />
                Your browser does not support the video tag.
              </video> 
            : null
        }

        { 
          this.isImg && !this.isPreviewUnavailable
            ? <v-img width={this.width} height={this.height}
                content-class={this.contentClass}
                src={this.getFileUrl()} />
            : null
        }

        { 
          this.isAudio && !this.isPreviewUnavailable
            ? <audio width={this.width} height={this.height} controls>
                <source src={this.getFileUrl()} type="audio/ogg" />
                <source src={this.getFileUrl()} type="audio/mpeg" />
                Your browser does not support te audio element.
              </audio>
            : null
        }

        {
          this.isPreviewUnavailable 
            ? <div class="pt-8 pb-8" style={{ "height": this.height, "width": this.width }}>
                <div>Preview is not available.</div> 
                 { this.isDownloadShown ? <div><a href={this.getFileUrl(true)}>Download</a> the file to browse it locally.</div>: null }
              </div>
           : null
        }
      </div>
  }
});
