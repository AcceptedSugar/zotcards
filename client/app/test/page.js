import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
      // Fetch data from Flask backend when the component mounts on the client side
      fetch('http://localhost:5000/api/test')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
      <div>
        {JSON.stringify(data)}
      </div>
  );
}

export default MyComponent;
