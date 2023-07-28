import React from "react";
import { useRouterContext } from "@refinedev/core";
import Button from "@mui/material/Button";

import { logo, yariga } from "../../../assets";

export const Title = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Yariga" width="120px" />
        ) : (
          <img src={yariga} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};