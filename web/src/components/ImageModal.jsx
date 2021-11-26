/**@jsxRuntime classic */
/**@jsx jsx */

import * as React from "react";
import { css, jsx } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function ImageModal({ src, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {children}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img
            src={src}
            alt='modal'
            css={css`
              width: 90%;
            `}
          />
        </Box>
      </Modal>
    </div>
  );
}
