/**
 * @file 自定义拖拽命令
 */

import Vue from 'vue';

const Drag = {
  install (Vue: any) {
    // 如需禁止拖拽元素内部某些元素触发拖拽，在内部不可触发拖拽元素上添加@mousedown.native.stop即可
    Vue.directive('drag', {
      bind (el: any) {
        el.style.position = 'absolute';
        el.style.zIndex = el.style.zIndex || '3000';
      },

      inserted (el: any) {
        // 设置元素初始位置
        const boundingClientRect = el.getBoundingClientRect();
        el.style.left = boundingClientRect.x + 'px';
        el.style.top = boundingClientRect.y + 'px';
        // 将拖拽元素置于body子元素，防止被relative的父元素遮挡
        document.body.appendChild(el);

        let originX: number;
        let originY: number;
        const mouseDownHandler = (evt: MouseEvent) => {
          originX = evt.clientX - el.offsetLeft;
          originY = evt.clientY - el.offsetTop;
          el.style.cursor = 'pointer';
        };
        const mouseMoveHandler = (evt: MouseEvent) => {
          if (evt.buttons === 1 && originX && originY) {
            el.style.left = evt.clientX - originX + 'px';
            el.style.top = evt.clientY - originY + 'px';
          }
        };
        const mouseUpHandler = () => {
          el.style.cursor = 'default';
        };
        el.addEventListener('mousedown', mouseDownHandler);
        el.addEventListener('mousemove', mouseMoveHandler);
        el.addEventListener('mouseup', mouseUpHandler);
        el.__mouseDownHandler__ = mouseDownHandler;
        el.__mouseMoveHandler__ = mouseMoveHandler;
        el.__mouseUpHandler__ = mouseUpHandler;
      },

      unbind (el: any) {
        el.removeEventListener('mousedown', el.__mouseDownHandler__);
        el.removeEventListener('mousemove', el.__mouseMoveHandler__);
        el.removeEventListener('mouseup', el.__mouseUpHandler__);
        // 当父组件销毁触发unbind的时候需要手动删除这个节点，不然会一直存留在body中
        el.parentNode.removeChild(el);
      }
    });
  }
};
Vue.use(Drag);
export default Drag;