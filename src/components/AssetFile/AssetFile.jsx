import { defineComponent } from '@/casimir-framework/all';
import { VexImage } from '@/plugins/VuetifyExtended';
import { VImg } from 'vuetify/lib/components';

const audioExtensions = require('audio-extensions');
const imageExtensions = require('image-extensions');
const videoExtensions = require('video-extensions');


export default defineComponent({
  name: 'AssetFile',

  components: {
    // VexImage,
    VImg
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

    fileUrl() {
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
        filename: file.value
      });
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
      return videoExtensions.some((e) => e == ext);
    },

    isAudio() {
      const file = this.file;
      if (!file) return null;
      const ext = this.getExtension(file.value);
      return audioExtensions.some((e) => e == ext && ext != 'mp4');
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

  },

  render() {
    // return <vex-image 
    //   height="400" 
    //   width="100%"
    //   content-class="responsive-image" 
    //   full-view 
    //   src={this.fileUrl} />;

    // return <v-img
    //   height="400" 
    //   width="100%"
    //   content-class={this.contentClass}
    //   src={this.fileUrl} />;

    // return <div style={{"text-align": this.textAlign}}>
    //     <object data={this.fileUrl} width="300" height="200"></object>
    //   </div>

      return <div class={this.contentClass} style={{ "text-align": this.textAlign}}>

        { this.isVideo
            ? <video width={this.width} height={this.height} controls>
                <source src={this.fileUrl} type="video/mp4" />
                <source src={this.fileUrl} type="video/ogg" />
                Your browser does not support the video tag.
              </video> 
            : null
        }

        { this.isImg
            ? <v-img width={this.width} height={this.height}
                content-class={this.contentClass}
                src={this.fileUrl} />
            : null
        }

        { this.isAudio
            ? <audio width={this.width} height={this.height} controls>
                <source src={this.fileUrl} type="audio/ogg" />
                <source src={this.fileUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            : null
        }
      </div>
  }
});
