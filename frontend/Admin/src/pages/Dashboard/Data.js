import { FaPeopleGroup } from "react-icons/fa6";
import { SiWikibooks } from "react-icons/si";
import { MdPageview } from "react-icons/md";

export const CardData = [
    {
        title: "Users",
        color:{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value:"25.200",
        png: FaPeopleGroup,
        series:[
            {
                name:"Users",
                data:[10,25,15,30,12,35]
            }
        ]
    },
    {
        title: "Stories",
        color:{
            backGround: "linear-gradient(180deg,rgb(236, 118, 130) 0%,rgb(245, 174, 181) 100%)",
            boxShadow: "0px 10px 20px 0px #fdc0c7",
        },
        barValue: 80,
        value: "14.238",
        png: SiWikibooks,
        series:[
            {
                name:"Stories",
                data:[10,100,15,5,103]
            }
        ]
    },
    {
        title: "PageView",
        color:{
            backGround: "linear-gradient(rgb(154, 220, 226) -14.42%,rgb(128, 218, 220) )",
            boxShadow: "0px 10px 20px 0px rgb(186, 218, 219)",
        },
        barValue: 60,
        value: "4,270",
        png: MdPageview,
        series:[
            {
                name:"PageView",
                data:[10,25,15,30,12,15,20]
            }
        ]
    },

]