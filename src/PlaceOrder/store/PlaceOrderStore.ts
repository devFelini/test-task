import { observable, computed, action } from "mobx";

import { OrderSide, ValidateItem } from "../model";

export class PlaceOrderStore {
  @observable activeOrderSide: OrderSide = "buy";
  @observable profitMode: boolean = false;
  @observable price: number = 0;
  @observable amount: number = 0;
  @observable profitList: { profit: number, percent: number }[] = [];
  @observable profitMaxCount: number = 5;
  @observable profitValidateError: ValidateItem[] = [];

  @computed get total(): number {
    return this.price * this.amount;
  }

  @computed get profitCount(): number {
    return this.profitList.length;
  }

  @computed get profitTotal(): number {
    let profitTotal = 0;
    let priceTotal = this.total;
    this.profitList.forEach(function(item, i) {
      profitTotal += (priceTotal * item.profit / 100) * item.percent / 100;   
    });

    return profitTotal;
  }

  @action.bound
  public setOrderSide(side: OrderSide) {
    this.activeOrderSide = side;
  }

  @action.bound
  public setPrice(price: number) {
    this.price = price;
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }

  @action.bound
  public setTotal(total: number) {
    this.amount = this.price > 0 ? total / this.price : 0;
  }

  @action.bound
  public setProfitMode(profitMode: boolean) {
    this.profitMode = profitMode;
  }

  @action.bound
  public addProfitItem() {
    let newProfitList = this.profitList.slice();
    let profit = 2;
    let percent = 100;

    if(newProfitList.length > 0) {
      let lastProfit = newProfitList[newProfitList.length - 1];

      profit = lastProfit.profit + 2;
      percent = 20;

      newProfitList[0].percent -= percent;
      if(newProfitList[0].percent < 0) {
        newProfitList[0].percent = 0;
      }
    }

    newProfitList.push({profit: profit, percent: percent});

    this.profitList = newProfitList;
  }

  @action.bound
  public deleteProfitItem(index: number) {
    let newProfitList = this.profitList.slice();
    newProfitList.splice(index, 1);

    this.profitList = newProfitList;
  }

  @action.bound
  public changeProfitItem(index: number, data: {profit: number, percent: number}) {
    let newProfitList = this.profitList.slice();

    newProfitList[index] = data;
    
    this.profitList = newProfitList;
  }

  @action.bound
  public validateProfit() {

    let newProfitValidate: ValidateItem[] = []

    let totalPercent = 0;
    let totalProfit = 0;

    this.profitList.forEach(function(item, i) {
      totalPercent += item.percent;
      totalProfit += item.profit;
    });
    
    let percentTotalError: boolean | string = false;
    if(totalPercent > 100) {
      percentTotalError = `${totalPercent} out of 100% selected. Please decrease by ${totalPercent - 100}`;
    }

    let profilTotalError: boolean | string = false;
    if(totalProfit > 500) {
      profilTotalError = "Maximum profit sum is 500%";
    }
  

    let prevProfit = 0;
    let total = this.total;
    this.profitList.forEach(function(item, i) {
      let validateItem: ValidateItem = { profit: false, percent: false, price: false }

      if(item.profit < 0.01) {
        validateItem.profit = "Minimum value is 0.01";
      } else if(item.profit <= prevProfit) {
        validateItem.profit = "Each target's profit should be greater than the previous one";
      } else if(profilTotalError) {
        validateItem.profit = profilTotalError;
      }

      prevProfit = item.profit 

      if(percentTotalError) {
        validateItem.percent = percentTotalError;
      }

      if(item.profit <= 0 || total <= 0) {
        validateItem.price = "Price must be greater than 0"
      }

      newProfitValidate.push(validateItem)
    });

    this.profitValidateError = newProfitValidate;
  }

  @action.bound
  public clearValidateProfit() {
    this.profitValidateError = []
  }

  
}
