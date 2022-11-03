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

export const successMessage = (name, onOk) => {
  let secondsToGo = 10;

  const modal = Modal.success({
    title: "end discussion",
    content: `You successfully ended your discussion with ${name}. You can always restart a discussion on this deal at a later time.`,
    onOk: onOk,
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
