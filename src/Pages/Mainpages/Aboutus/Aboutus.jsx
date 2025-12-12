import React, { useRef } from 'react';

const Aboutus = () => {
    const riderModelRef = useRef();

  const handelShowModel = () => {
    riderModelRef.current.showModal();
   
 };


    return (
        <div>

            <button 
            onClick={handelShowModel}
            >Open model</button>
            
              <dialog
            ref={riderModelRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
                  <h2>hell moderl</h2>

              <div className="modal-action">
                <form method="dialog">
                  {/* close modarl */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

        </div>
    );
};

export default Aboutus;