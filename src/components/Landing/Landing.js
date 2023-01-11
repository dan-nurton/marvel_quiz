import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

  //Ref to "main" node className welcomePage
  const refWolverine = useRef(null);

  //useState display buttons -> set to false
  const [btn, setBtn] = useState(false);

  // useEffet with dependency (empty array) -> componentDidMount
  useEffect(() => {
    // add className to "main" node (refWolverine)
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      //  remove className after 3s
      refWolverine.current.classList.remove("startingImg");
      // set display button to true
      setBtn(true);
    }, 500)
  }, []);

  // set corner image on mouseOver
  const setImage = (corner) => {
    corner === 'left' ? refWolverine.current.classList.add("leftImg") : refWolverine.current.classList.add("rightImg");

  }

  // remove className on mouseOut
  const clearImage = () => {
    if (refWolverine.current.classList.contains("rightImg")) {
      refWolverine.current.classList.remove("rightImg");
    } else if (refWolverine.current.classList.contains("leftImg")) {
      refWolverine.current.classList.remove("leftImg");
    }
  }

  // display buttons only if state btn is set to true
  const displayButton = btn && (
    <Fragment>
      <div className="leftBox">
        <Link onMouseOut={clearImage} onMouseOver={() => setImage('left')} className="btn-welcome" to="/signup">Inscription</Link>
      </div>
      <div className="rightBox">
        <Link onMouseOut={clearImage} onMouseOver={() => setImage('right')} className="btn-welcome"  to="/login">Connexion</Link>
      </div>
    </Fragment>
  )

  return (
    /* ref  useRef = refWolverine*/
    <main ref={refWolverine} className='welcomePage'>
      {/* display buttons function */}
      {displayButton}
    </main>
  )
}

export default Landing