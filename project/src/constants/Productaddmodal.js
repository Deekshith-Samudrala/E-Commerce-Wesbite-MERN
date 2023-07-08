import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Productaddmodal = (props) => {

    let navigate = useNavigate();

    let gotocart = ()=>{
        window.scrollTo({
            top : 0,
            behavior : "smooth"
        })
        navigate("/cart");
    }

  return (
  <>
        <div className='modal fade' id="productmodal">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'><h2>New item added</h2></div>
                    <div className='modal-body'>New item added <b><u>{props.name}</u></b> successfully</div>
                    <div className='modal-footer'>
                        <button onClick={gotocart} className="btn btn-info" data-dismiss="modal">Cart</button>
                        <button onClick={props.reset} className='btn btn-danger' data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Productaddmodal