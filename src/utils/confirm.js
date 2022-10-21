import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export function showConfirm(title, content, onOk) {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    onOk,
    onCancel() {},
  });
}

export const confirmModal = (title, content, ok, checked) => {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    onOk() {
      return ok();
    },
    okButtonProps: {
      disabled: checked,
    },
    onCancel() {},
  });
};

export const successMessage = (name) => {
  let secondsToGo = 5;

  const modal = Modal.success({
    title: "end chat",
    content: `you have successfully ended your chat with ${name}.`,
  });

  setTimeout(() => {
    clearInterval();
    modal.destroy();
  }, secondsToGo * 1000);
};

export const errorMessage = (error) => {
  let secondsToGo = 10;

  const modal = Modal.error({
    title: "end chat",
    content: `${error}`,
  });

  setTimeout(() => {
    clearInterval();
    modal.destroy();
  }, secondsToGo * 1000);
};
