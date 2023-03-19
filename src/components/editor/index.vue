<template>
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
        class="editor"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { SlateNode } from "@wangeditor/editor"

export default {
  components: { Editor, Toolbar },
  emits: ['handleChange'],
  setup(props, ctx) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = {
      placeholder: '请输入内容...',
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const handleChange = (editor) => {
      const headers = editor.getElemsByTypePrefix('header')
      const headerContainerInnerHTML = headers.map(header => {
        const text = SlateNode.string(header)
        const { id, type } = header
        return `<li id="${id}" type="${type}">${text}</li>`
      }).join('');
      ctx.emit("handleChange", headerContainerInnerHTML)
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
    };
  }
}
</script>
<style lang="scss" scoped>
div.myEditor {
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
      height: 100%;
      overflow-y: hidden;
      border-radius: 15px;
    }
  }
}

</style>
