/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import { observer } from "mobx-react";
import block from "bem-cn-lite";
import { AddCircle } from "@material-ui/icons";

import { TextButton } from "components";

import { OrderSide } from "../../../model";

import { useStore } from "../../../context";


import { QUOTE_CURRENCY } from "../../../constants"; 

import { TakeProfitItem } from "./TakeProfitItem";

const b = block("take-profit");

const TakeProfitContent = observer(() => {
  const {
    profitList,
    profitCount,
    profitMaxCount,
    profitTotal,
    activeOrderSide,
    price,
    profitValidateError,
    addProfitItem,
    deleteProfitItem,
    changeProfitItem,
    clearValidateProfit,
  } = useStore();

  return (
    <div className={b("content")}>
        {renderTitles()}
        {renderInputs()}
        {renderAddBtn()}
        <div className={b("projected-profit")}>
          <span className={b("projected-profit-title")}>Projected profit</span>
          <span className={b("projected-profit-value")}>
            <span>{profitTotal}</span>
            <span className={b("projected-profit-currency")}>
              {QUOTE_CURRENCY}
            </span>
          </span>
        </div>
      </div>
  );

  function renderInputs() {
    return (
      profitList.map((elem, index) => {
        return (
          <TakeProfitItem key={index} index={index} data={elem} price={price} deleteProfitItem={deleteProfitItem} changeProfitItem={changeProfitItem} profitValidateError={profitValidateError[index]} clearValidateProfit={clearValidateProfit}/>
        );
      })
    )
  }

  function renderAddBtn() {
    if(profitCount < profitMaxCount) {
      return (
        <TextButton className={b("add-button")} onClick={addProfitItem}>
          <AddCircle className={b("add-icon")} />
          <span>Add profit target {profitCount}/5</span>
        </TextButton>
      )
    }
  }

  function renderTitles() {
    return (
      <div className={b("titles")}>
        <span>Profit</span>
        <span>Target price</span>
        <span>Amount to {activeOrderSide === "buy" ? "sell" : "buy"}</span>
      </div>
    );
  }
});

export { TakeProfitContent };
