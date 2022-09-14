import React, { useState } from "react";
import ListItem from "../listItem/ListItem";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

import "./list.scss";
import { useRef } from "react";

const List = ({list, }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slidenumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();

  const handelClick = (direction) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slidenumber > 0) {
      setSlideNumber(slidenumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slidenumber < 10 - clickLimit) {
      setSlideNumber(slidenumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          onClick={() => handelClick("left")}
          className="sliderArrow"
          style={{display : !isMoved && "none"}}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} key={i} item={item}/>
            
          ))}
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handelClick("right")}
          className="sliderArrow right"
        />
      </div>
    </div>
  );
};

export default List;
