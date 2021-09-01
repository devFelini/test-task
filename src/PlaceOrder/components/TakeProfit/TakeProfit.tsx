/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import block from "bem-cn-lite";

import { OrderSide } from "../../model";

import { TakeProfitSwitcher } from "./components/TakeProfitSwitcher";
import { TakeProfitContent } from "./components/TakeProfitContent";

import "./TakeProfit.scss";

type Props = {
  profitMode: boolean;
  setProfitMode: (profitMode: boolean) => void;
};

const b = block("take-profit");

const TakeProfit = ({profitMode, setProfitMode }: Props) => {

  return (
    <div className={b()}>
      <TakeProfitSwitcher profitMode={profitMode} setProfitMode={setProfitMode}/>
        {renderContent()}
    </div>
  );

  function renderContent() {
    if(profitMode) {
      return (
        <TakeProfitContent />
      )
    }
  }
  
};

export { TakeProfit };
