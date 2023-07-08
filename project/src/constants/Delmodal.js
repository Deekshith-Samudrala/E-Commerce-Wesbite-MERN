import React from 'react';

const Delmodal = (props) => {
  return (
    <>
        <div className='modal fade' id="delmodal">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'><h2>Delete</h2></div>
                    <div className='modal-body'><p>Are you sure you want to delete <u><b>{props.dispselectedcate}</b></u>?</p></div>
                    <div className='modal-footer'>
                        <button className='btn btn-danger' data-dismiss="modal" onClick={props.confirmdelete}>Delete</button>
                        <button className='btn btn-primary' data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Delmodal