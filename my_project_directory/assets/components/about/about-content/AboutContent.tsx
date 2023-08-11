import React from "react";
import './AboutContent.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


function AboutContent() {
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=681&q=80',
            title: 'Breakfast',
        },
        {
            img: 'https://expertphotography.b-cdn.net/wp-content/uploads/2021/07/minimalist-photography-pier.jpeg',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1563863564165-b9d60de8631b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1683127004449-e6ed3ea0c264?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1533818616543-a5dc3945c5ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
            title: 'Honey',
        },
        {
            img: 'https://images.unsplash.com/photo-1571228718732-a4122dcd4fca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1679599767344-d28d47771cdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1505163343492-97bd29c2238b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1669718612293-26e31776fd59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1679649995776-11e713cdeee9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=673&q=80',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1679674704818-f3a500c1305b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            title: 'Bike',
        },
    ];
    return (
      <div className="container">
          <div className="about-us-content">

              <div className="about-us-content-image">
                  <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                      {itemData.map((item:any) => (
                          <ImageListItem key={item.img}>
                              <img
                                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                  alt={item.title}
                                  loading="lazy"
                              />
                          </ImageListItem>
                      ))}
                  </ImageList>
              </div>

              <div className="about-us-content-text">
                  <h2>My name is Filip Szabo</h2>
                  <p>Photography has always been a passion for me. Even as a small child I liked to photograph all the beautiful moments that happened. Growing up, I realized how beautiful and important these memories are. So I started capturing beautiful moments in other people's lives too.<br/> So here I am!</p>
              </div>
          </div>
      </div>
    );
}

export default AboutContent;