import React from 'react'; 

const StarRating = ({rating}) => {
    let stars = []; 

    for(let i=1; i<=5; i++){
        if(i<=rating){
            stars.push(<i key={i} className="fas fa-star text-warning"></i>); 
        } else {
            stars.push(<i key={i} className="far fa-star text-warning" aria-hidden="true"></i>); 
        }
    }

  return (
      <>
      {rating>0 ? stars : (<div>No reviews yet!</div>)}
      </>
  )
}

export default StarRating; 