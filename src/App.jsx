import './App.css'
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState(null);
  const [clickedItemDescription, setClickedItemDescription] = useState("No job selected");
  const [clickedItemUrl, setClickedUrl] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(`/apiCall?pageNumber=${pageNumber}`);
        const result = await response.json();
        setData(result.data);
        console.log("USE EFFECT WAS CALLED")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApiData(pageNumber);
  }, [pageNumber]);

  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1);
    setData(null)
  };

  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
    setData(null)
  };

  return (
    <>
      <div className="container">
        <div className="container_div" id= "left_div">
          {data ? (
            data.map(item => 
              <>
                <div className="job_card" key = {item.slug} onClick={()=> {setClickedItemDescription(item.description); setClickedUrl(item.url)}}>
                  <p>Company Name: {item.company_name}</p>
                  <p>Location: {item.location}</p>
                  <p>Remote: {item.remote ? "Yes": "No"}</p>
                  <p>Tags: {item.tags}</p>
                  <p>Title: {item.title}</p>
                </div>
                <br></br>
              </>)
            ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="container_div" id="right_div">
          {clickedItemDescription != "No job selected" ? (
            <>
              <div className='description'>{parse(clickedItemDescription)}</div>
              <p>Learn more information about the job at <a href={clickedItemUrl}>Arbeitnow</a></p>
            </>
          ): (
            <p>No job selected</p>
          )}
        </div>
        <div className='page_directory_div'>
          {pageNumber > 0 ? (
              <button id="prev_button" onClick={handlePrevClick}> Prev </button>
          ): (null)}
          <button id="current_button">{pageNumber}</button>
          <button id="next_button" onClick={handleNextClick}> Next </button>
        </div>
      </div>
    </>
  );
}

export default App
