import React from "react";
import { CardData } from "./Data";
import "./Cards.css";
import Card from "./Card";
const Cards = () => {
    return(
        <div className="Cards">
            {CardData.map((card,id)=>{
                return(
                    <div className="parentContainer">
                        <Card 
                        title = {card.title}
                        color={card.color}
                        barValue = {card.barValue}
                        value = {card.value}
                        png = {card.png}
                        series = {card.series}
                        />
                    </div>
                )
})}
        </div>
    )
}
export default Cards;