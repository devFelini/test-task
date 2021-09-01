/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import block from "bem-cn-lite";
import { Cancel } from "@material-ui/icons";

import { NumberInput } from "components";

import { ProfitField, ValidateItem } from "../../../model";


import { QUOTE_CURRENCY } from "../../../constants"; 

const b = block("take-profit");

type Props = {
  key: number;
  index: number; 
  data: { profit: number; percent: number; }; 
  price: number;
  profitValidateError: ValidateItem;
  deleteProfitItem: (index: number) => void;
  changeProfitItem: (index: number, data: { profit: number; percent: number; }) => void;
  clearValidateProfit: () => void;
}
const TakeProfitItem = ({index, data, price, profitValidateError, deleteProfitItem, changeProfitItem, clearValidateProfit}: Props) => {
  let profitPrice = price + price * data.profit / 100;
  let profitError: boolean | string = false;
  let percentError: boolean | string = false;
  let priceError: boolean | string = false;

  if(profitValidateError) {
    if(profitValidateError.profit) {
      profitError = profitValidateError.profit;
    }
    if(profitValidateError.percent) {
      percentError = profitValidateError.percent;
    }
    if(profitValidateError.price) {
      priceError = profitValidateError.price;
    }
  }

  return (
    <div className={b("inputs")}>
        <NumberInput
          value={data.profit}
          decimalScale={2}
          InputProps={{ endAdornment: "%" }}
          variant="underlined"
          error={profitError}
          onChange={(e) => changeInputValue('profit', e)}
          onBlur={() => clearValidateProfit()}
        />
        <NumberInput
          value={profitPrice}
          decimalScale={2}
          InputProps={{ endAdornment: QUOTE_CURRENCY }}
          variant="underlined"
          error={priceError}
          onChange={(e) => changeInputValue('price', e)}
          onBlur={() => clearValidateProfit()}
        />
        <NumberInput
          value={data.percent}
          decimalScale={2}
          InputProps={{ endAdornment: "%" }}
          variant="underlined"
          error={percentError}
          onChange={(e) => changeInputValue('percent', e)}
          onBlur={() => clearValidateProfit()}
        />
        <div className={b("cancel-icon")}>
          <Cancel onClick={() => deleteProfitItem(index)}/>
        </div>
      </div>
  );

  function changeInputValue(type: ProfitField, value: number | null) {
    let new_data = {...data}

    if(typeof value == 'number') {
      if(type == "price") {
        value = (value - price) / price * 100
        type = "profit"
      }
    
      new_data[type] = value;
    }

    changeProfitItem(index, new_data);
  }

};

export { TakeProfitItem };
