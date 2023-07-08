import React from 'react';
import { useEffect,useState } from 'react';
import categoryservice from "../../../../services/Categoryservice";
import { useNavigate,useParams } from 'react-router-dom';
import Delmodal from '../../../../constants/Delmodal';
import { adminkeyword } from '../../../../constants/Adminurl';

const Subcategorylist = () => {

    let counter = 1;
    let navigate = useNavigate();
    let params = useParams();

    let [allcategory,setAllcategory] = useState([]);
    let [subcate,setSubcate] = useState([]);
    let [selectedcate,setSelectedcate] = useState("");
    let [selectedsubcate,setSelectedsubcate] = useState("");
    let [catee,setCatee] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("admintoken")){
            let categorydata = async ()=>{
                let result = await categoryservice.getall();
                setAllcategory(result.info);
            }

            categorydata();
        }
        else{
            navigate(`/admin${adminkeyword}`);
        }
    },[])
        
    let getsubcate = async (e)=>{
        if(e.target.value != "101"){
        setCatee(e.target[e.target.selectedIndex].text);
        setSelectedcate(e.target.value);
        let result = await categoryservice.getcate(e.target.value);
        setSubcate(result.info[0].subcategory);
    }
    else{
        setSelectedcate("");
    }
    }

    let askdelsubcate = (subcate)=>{
        setSelectedsubcate(subcate);
    }

    let confdelsubcate = async ()=>{
        let result = await categoryservice.delsubcate(selectedcate,selectedsubcate._id);
        setSubcate((arr)=>{
            return arr.filter((val)=>val != selectedsubcate)
        })
    }

    let askedit = (subcate)=>{
        navigate(`/admin${adminkeyword}/subcategory/edit/${selectedcate}/${subcate._id}`)
    }

    return (
    <>
        <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <select className='form-control my-5 bg-dark text-light' onClick={(e)=>getsubcate(e)}>
                        <option value="101" >Select Category</option>
                        {
                            allcategory.map(cate=><option value={cate._id} key={cate._id}>{cate.name}</option>)
                        }
                    </select>
                        { 
                        selectedcate.length ? 
                            (
                                subcate.length ? 
                                    (
                                        <table className='table table-hover table-dark table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>slno</th>
                                                    <th>Category</th>
                                                    <th>Sub-Category</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    subcate.map((subcate)=>{
                                                        return(
                                                            <tr key={subcate._id}> 
                                                                <td>{counter++}</td>
                                                                <td>{catee}</td>
                                                                <td>{subcate.name}</td>
                                                                <td><button className='btn btn-sm btn-primary' onClick={()=>askedit(subcate)}>Edit</button></td>
                                                                <td><button className='btn btn-danger btn-sm' data-toggle="modal" data-target="#delmodal" onClick={()=>askdelsubcate(subcate)}>Delete</button></td>
                                                            </tr>)
                                                        })
                                                    }
                                            </tbody>
                                        </table>
                                    )
                                    : 
                                    <div className='alert alert-danger'>No Data Found !</div>
                            )
                            : <div className='alert alert-success'>Please select a category</div>
                        }
                </div>
            </div>
        </div>
        <Delmodal dispselectedcate={selectedsubcate.name} confirmdelete={confdelsubcate}></Delmodal>
    </>
  )
}

export default Subcategorylist