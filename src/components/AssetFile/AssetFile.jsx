import { defineComponent } from '@/casimir-framework/all';
import { VexImage } from '@/casimir-framework/plugins/VuetifyExtended';
import { VImg, } from 'vuetify/lib/components';

const audioExtensions = require('audio-extensions');
const imageExtensions = require('image-extensions');
const videoExtensions = require('video-extensions');

const supportedPreviews = ['webm', 'mp4', 'mpeg', 'mp3', 'jpg', 'jpeg', 'png', 'gif'];

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
      return videoExtensions.some((e) => e == ext) || ext.toLowerCase() == 'mov';
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

    isPreviewAvailable() {
      const file = this.file;
      if (!file) return null;
      const ext = this.getExtension(file.value);
      return supportedPreviews.some((e) => e == ext);
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
      const { _id: nftItemId } = this.schemaData.data;
      const file = this.file;
      if (!file) return null;

      const scopeId = nftItemId;

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
          this.isVideo && this.isPreviewAvailable
            ? <video width={this.width} height={this.height} controls>
                <source src={this.getFileUrl()} type="video/mp4" />
                <source src={this.getFileUrl()} type="video/ogg" />
                <source src={this.getFileUrl()} type="video/quicktime" />
                Your browser does not support the video tag.
              </video> 
            : null
        }

        { 
          this.isImg && this.isPreviewAvailable
            ? <v-img width={this.width} height={this.height}
                content-class={this.contentClass}
                src={this.getFileUrl()} />
            : null
        }

        {
          !this.isPreviewAvailable 
            ? <div class="pt-8 pb-8" style={{ "height": this.height, "width": this.width }}>
                <div>Preview is not available.</div> 
                 { this.isDownloadShown ? <div><a href={this.getFileUrl(true)}>Download</a> the file to browse it locally.</div> : null }
              </div>
           : null
        }
      </div>
  }
});
