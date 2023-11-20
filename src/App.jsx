import './App.css'
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Header from './Header.jsx';

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState(null);
  const [clickedItem, setClickedItem] = useState("No job selected");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(`/apiCall?pageNumber=${pageNumber}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApiData(pageNumber);
  }, [pageNumber]);

  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1);
    setData(null)
    setActiveCard(null)
  };

  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
    setData(null)
    setActiveCard(null)
  };

  const handleCardClick = (cardId)=>{
    if (activeCard !== null) {
      document.getElementById(activeCard).classList.remove('active');
    }

    // Set the new active element and add the class to it
    setActiveCard(cardId);
    document.getElementById(cardId).classList.add('active');
  };

  return (
    <>
      <Header/>
      <div className="container">
        <div className="page_directory_div">
          {pageNumber > 1 ? (
              <button type="button" id="prev_button" onClick={handlePrevClick}> Prev </button>
          ): (<button type="button" id="prev_button" onClick={handlePrevClick} disabled> Prev </button>
          )}
          <p id="page_number">{pageNumber}</p>
          <button type="button" id="next_button" onClick={handleNextClick}> Next </button>
        </div>
        <div className="flexbox_filler"></div>
        <div className="flexbox_break"></div>
        <div className="container_div" id= "left_div">
          {data ? (
            data.map(item => 
              <>
                <div className="job_card" id={item.slug} key = {item.slug} 
                  onClick={()=> {
                    setClickedItem(item);
                    document.getElementById('right_div').scrollTop =0;
                    handleCardClick(item.slug);
                  }}
                >
                  <h1>{item.title}</h1>
                  <h2>{item.company_name}</h2>
                  <p>Location: {item.location}</p>
                  <p>Remote: {item.remote ? "Yes": "No"}</p>
                  {item.tags.length != 0 ? (<p>Tags: {item.tags}</p>): (null)}
                </div>
                <br></br>
              </>)
            ) : (
            <h1>Loading...</h1>
          )}
        </div>

        <div className="container_div" id="right_div">
          {clickedItem != "No job selected" ? (
            <>
              <h1 className="title">{clickedItem.title}</h1>
              <h2 className="company_name">{clickedItem.company_name}</h2>
              <div className="description">{parse(clickedItem.description)}</div>
              <p>Learn more information about the job at <a href={clickedItem.url}>Arbeitnow</a></p>
            </>
          ): (
            <p>No job selected</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App
