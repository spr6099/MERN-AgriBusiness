import React, { useState } from 'react';
// productId, farmerId, userId, rating ,farmername,subcategory
function Rating({ productId, farmerId, userId , farmername,subcategory,username}) {
  const [rating, setRating] = useState(0);

  const handleReview = () => {
    const params = {
      productId: productId,
      farmerId: farmerId,
      userId: userId,
      rating: rating,
      farmername:farmername,
      subcategory:subcategory,
      username:username
    };

    fetch("http://localhost:5000/rating", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        alert ("Rating added successfully")
        // Handle success message or UI update after successful rating submission
      })
      .catch((error) => {
        console.error('Error adding rating:', error);
        alert ("Error")

        // Handle error message or UI update for failed rating submission
      });
  };

  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className='star'
          key={star}
          style={{
            cursor: 'pointer',
            color: rating >= star ? 'gold' : 'gray',
            fontSize: `35px`,
          }}
          onClick={() => {
            setRating(star);
          }}
        >
          {'★'}
        </span>
      ))}
      <button onClick={handleReview} className='btn btn-outline-success'>
        Submit
      </button>
    </>
  );
}

export default Rating;


