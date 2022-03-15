import logo from './logo.svg';
import React from 'react';
import './App.css';
import MasonryGrid from './components/MasonryGrid/MasonryGrid';
import Card from './components/Card/Card';
import mockData from './mock/mockData.json';


function App() {
  const [displayStatus, setDisplayStatus] = React.useState(false)

  function after(count, f) {
    let noOfCalls = 0;
    return function (...rest) {
      noOfCalls = noOfCalls + 1;
      if (count === noOfCalls) {
        f(...rest);
      }
    };
  }
  const onComplete = after(mockData.length, () => {
    console.log("loaded");
    setDisplayStatus(true)
  });

  return (
    <div className="App">
      <h1>Demo of Masonry grid</h1>
      <MasonryGrid
        displayStatus={displayStatus}
      >
        {mockData.map(card => {
          return <Card
            key={card.id}
            image={card.image}
            author={card.author}
            heading={card.title}
            description={card.subtitle}
            link={card.link}
            firstCardSizeMode='big'
            onLoad={onComplete}
          />;
        })}
      </MasonryGrid>
    </div>
  );
}

export default App;
