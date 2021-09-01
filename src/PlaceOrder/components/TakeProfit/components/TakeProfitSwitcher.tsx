/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import block from "bem-cn-lite";

import { Switch } from "components";

const b = block("take-profit");

type Props = {
  profitMode: boolean;
  setProfitMode: (profitMode: boolean) => void;
};

const TakeProfitSwitcher = ({profitMode, setProfitMode}: Props) => {

  return (
    <div className={b("switch")}>
      <span>Take profit</span>
      <Switch checked={profitMode} onChange={(e) => setProfitMode(e)} />
    </div>
  );
};

export { TakeProfitSwitcher };
