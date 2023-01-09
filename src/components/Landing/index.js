import React, { useRef, useEffect, useState, Fragment } from 'react'

const Landing = () => {

  //Ref to "main" node className welcomePage
  const refWolverine = useRef(null);

  //useState display buttons -> set to false
  const [btn , setBtn] = useState(false);

  // useEffet with dependency (empty array) -> componentDidMount
  useEffect (() => {
    // add className to "main" node (refWolverine)
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      //  remove className after 3s
      refWolverine.current.classList.remove("startingImg");
      // set display button to true
      setBtn(true);
    }, 500)
  }, [])

  // display buttons only if state btn is set to true
  const displayButton = btn && (
    <Fragment>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
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