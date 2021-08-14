import React from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const override = css`
  display: block;
  margin: 70px auto;
  border-color: red;
`;

export default function Loader() {
  return (
    <div>
      <FadeLoader
        color="#ed1450"
        loading={true}
        css={override}
        // size={50}
        height={15}
        width={4}
        radius={10}
        margin={0}
      />
    </div>
  );
}
