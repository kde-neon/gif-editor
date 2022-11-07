<template>
  <div class="editor-canvas">
    <div class="absolute item-center">
      <!-- 上传图片 -->
      <div v-show="status === 0 || status === 3 || status === 4">
        <Upload @on-change="$store.dispatch('load')" />
        <i class="iconfont icon-upload"></i>
      </div>
      <!-- 上传、解析进度条 -->
      <VProgress style="width: 80%" class="load-progress" v-show="status === 2" :max="200" :value="progress.value"
        :text="progress.text" />

    </div>

    <!--! TODO -->
    <div class="editor-canvas-container">
      <!-- <canvas width="1726" height="1726"></canvas>
      <canvas ref="canvasM" class="editor-main" width="1726" height="1726"></canvas>
      <canvas class="editor-edit" width="1726" height="1726" style="pointer-events: auto;"></canvas>
      <canvas class="editor-temp" width="1726" height="1726"></canvas> -->
    </div>

    <!-- Image preview when new image added -->
    <canvas class="pro-editor" ref="canvas" width="300" height="250"></canvas>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Upload from '@/components/Upload'
import VProgress from '@/components/Progress'
import { fabric } from 'fabric';


export default {
  computed: {
    ...mapGetters({
      status: 'status',
      loadProgress: 'loadProgress',
      parseProgress: 'parseProgress'
    }),
    progress() {
      return {
        value: this.loadProgress + this.parseProgress,
        text: this.loadProgress !== 100 ? '加载中' : '解析中'
      }
    }
  },

  mounted() {

    const fileDom = document.getElementById("image-input");
    fileDom.onchange = (e) => {
      const mainCanva = document.getElementById("MainCanvas");
      let canva = new fabric.Canvas("canvasM", {
        isDrawingMode: false,
      })

      canva.setDimensions({width: mainCanva.clientWidth, height:mainCanva.clientHeight});

      // create a rect object
      var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

      var img = document.createElement('img');
      img.src = deleteIcon;

      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }

      console.log(e)

      canva.add(deleteIcon)
      canva.setActiveObject(deleteIcon);
    }
  },

  components: {
    Upload,
    VProgress,
  }
}
</script>

<style lang="postcss">
.editor-canvas {
  position: absolute;
  top: 0;
  bottom: 130px;
  left: 0;
  right: 0;
  width: 100%;

  & .editor-canvas-box {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /*flex垂直居中在IOS9子元素有absolute属性时失效，采用这种方式居中：*/
  & canvas {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  & .absolute {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  & .icon-upload {
    font-size: 60px;
    color: white;
  }

  & .load-progress {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
