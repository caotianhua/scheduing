import {
  Button, message, Icon,
  Input,
  InputNumber, Select, Table, Upload, Space, Modal, Layout, Row, Col, Tag,
  Form, FormModel, Popconfirm
} from 'ant-design-vue';

const ant = {
  install: function (Vue) {
    Vue.use(message);
    Vue.use(Icon);
    Vue.use(Input);
    Vue.use(InputNumber);
    Vue.use(Select);
    Vue.use(Table);
    Vue.use(Upload);
    Vue.use(Space);
    Vue.use(Modal);
    Vue.use(Layout);
    Vue.use(Col,);
    Vue.use(Row);
    Vue.use(Tag);
    Vue.use(Form);
    Vue.use(FormModel);
    Vue.use(Popconfirm);

    Vue.component(Button.name, Button);
    Vue.prototype.$message = message;
    Vue.prototype.$info = Modal.info;
    Vue.prototype.$success = Modal.success;
    Vue.prototype.$error = Modal.error;
    Vue.prototype.$warning = Modal.warning;
    Vue.prototype.$confirm = Modal.confirm;
    Vue.prototype.$destroyAll = Modal.destroyAll;
  }
};
export default ant