import { Modal, Upload } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";

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

export const successMessage = (msg, onOk, title) => {
  let secondsToGo = 10;

  const modal = Modal.success({
    title: title || "end discussion",
    content: msg,
    onOk: onOk || null,
  });

  setTimeout(() => {
    clearInterval();
    // modal.destroy();
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
    // modal.destroy();
  }, secondsToGo * 1000);
};

export const successPaidMessage = (name, onOk) => {
  let secondsToGo = 10;

  const modal = Modal.success({
    title: `payment made to @${name}`,
    content: `You have made payment to ${name}. let the merchant confirm and release funds \
     it can be a screenshot of payment confirmation via the app or an email notification stating that you have completed the transfer`,
    onOk: onOk,
  });

  setTimeout(() => {
    clearInterval();
    // modal.destroy();
  }, secondsToGo * 1000);
};

export const uploadModal = (func, uploadImg) => {
  const modal = Modal.success({
    title: "upload payment receipt",
    content: (
      <div onClick={func}>
        <p>please upload your payment proof.</p>
        <p>image must be less than 2mb</p>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          disabled={true}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </div>
    ),
    onOk: uploadImg,
  });
};

export const chatIntroModal = (msg, onOk, disabled, stage) => {
  const modal = Modal.info({
    title: `stage ${stage}`,
    content: msg,
    onOk: onOk || null,
    okButtonProps: { disabled: false },
  });
};
