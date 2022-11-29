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

export const successMessage = (msg, onOk) => {
  let secondsToGo = 10;

  const modal = Modal.success({
    title: "end discussion",
    content: msg,
    onOk: onOk || null,
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

export const successPaidMessage = (name, onOk) => {
  let secondsToGo = 10;

  const modal = Modal.success({
    title: "payment",
    content: `You have made payment to ${name}. let the dealer confirm and release funds`,
    onOk: onOk,
  });

  setTimeout(() => {
    clearInterval();
    modal.destroy();
  }, secondsToGo * 1000);
};
