export const formatSourceText = (source) => {
  let src = "";

  if (source === "bank fund") {
    src = "bank account";
  } else {
    src = "wallet";
  }

  return src;
};
