<template>
  <div class="wangEditorArea">
    <div class="myCatalogArea">
      <ul>
        <li
          v-for="(item, index) in catalog"
          :type="item.type"
          :id="item.id"
          :key="item.id"
          @click="scrollToElem(item.id)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="myEditor" style="border: 1px solid #ccc">
      <Toolbar
        class="toolbar"
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <div class="editorContain">
        <Editor
          style="height: 600px"
          class="editor"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {SlateNode} from "@wangeditor/editor"

//目录
const catalog = ref([]);

//工具栏配置相关
const editorRef = shallowRef();
const toolbarConfig = {};
const mode = "simple";

//编辑器配置相关
const valueHtml = ref('<p>hello</p>')
const editorConfig = {
  placeholder: '请输入内容...',
}
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = (editor) => {
  const headers = editor.getElemsByTypePrefix('header');
  catalog.value = headers.map(header => {
    const text = SlateNode.string(header)
    const {id, type} = header
    return { id, type, text }
  })
}
const scrollToElem = (id) => {
  editorRef.value.scrollToElem(id)
}

//编辑器初始化内容回显
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>我是编辑器的异步设置内容！</p>'
  }, 500)
})

//组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<style lang="scss">
div.wangEditorArea {
  >div.myCatalogArea {
    float: left;
    width: 200px;
    height: 400px;
  }
  >div.myEditor {
    float: left;
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    flex-direction: column;
    div.toolbar {
      height: 69px;
      background: #F7F8FC;
      padding-top: 14px;
      ::v-deep {
        .w-e-toolbar {
          margin: 0 auto;
          background: #F7F8FC;
        }
      }
    }
    div.editorContain {
      flex: 1;
      background: #ebecef;
      padding: 20px 56px 68px 19px;
      div.editor {
        overflow-y: hidden;
        border-radius: 15px;
      }
    }
  }
}
</style>
