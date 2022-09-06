import React, { useState } from "react";
import ListItem from "../listItem/ListItem";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

import "./list.scss";
import { useRef } from "react";

const List = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [slidenumber, setSlideNumber] = useState(0);


  const listRef = useRef();

  const handelClick = (direction) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slidenumber > 0) {
      setSlideNumber(slidenumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slidenumber < 6) {
      setSlideNumber(slidenumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          onClick={() => handelClick("left")}
          className="sliderArrow"
          style={{display : !isMoved && "none"}}
        />
        <div className="container" ref={listRef}>
          <ListItem index={0}/>
          <ListItem index={1}/>
          <ListItem index={2}/>
          <ListItem index={3}/>
          <ListItem index={4}/>
          <ListItem index={5}/>
          <ListItem index={6}/>
          <ListItem index={7}/>
          <ListItem index={8}/>
          <ListItem index={9}/>
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
