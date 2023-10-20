import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Category = () => {

    const [categories,setCategories] = useState([])
    useEffect(()=>{
        loadAllCategories().then(data=>{
            setCategories([...data])
        }).catch(error=>{
            console.log(error)
            toast.error("error in loading categories")
        })
    },[])

  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
            <b>All Posts</b>
        </ListGroupItem>
        {
           categories && categories.map((cat,index)=>{
            return(
                <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} key={index} action={true} className='shadow border-0 mt-1'>
                    {cat.categoryName}
                </ListGroupItem>
            )
           }) 
        }
      </ListGroup>
    </div>
  )
}

export default Category
