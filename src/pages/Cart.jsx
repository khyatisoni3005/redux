import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { remove } from "../store/CartSlice"


export default function Cart() {

    const dispatch = useDispatch()
    const products = useSelector(state => state.cart)
    const handleRemove = (productId) => {
        dispatch(remove(productId))
    }
    return (
        <>
            <div className="row">
                {
                    products.map((product, ind) => {
                        return (
                            <div className="col-3" key={ind}>
                                <Card sx={{ maxWidth: 345, marginTop: "30px" }} >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="250"
                                        image={product.images}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.title}
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            {`$${product.price}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">buy now</Button>
                                        <Button size="small" onClick={() => handleRemove(product.id)}>romove</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        )

                    })
                }
            </div>

        </>

    )
}
