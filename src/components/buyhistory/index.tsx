import { useState, useEffect } from 'react'
import { VectorOutput } from "../../contracts/WebgumContractAbi"

interface IBuyHistory{
  buyerVector: VectorOutput | undefined
}

const BuyHistory = ({ buyerVector }: IBuyHistory) => {
  if(buyerVector){
    console.log("BUYER VECTOR:", buyerVector)
  }
  return (
    <div>BuyHistory</div>
  )
}

export default BuyHistory