import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { add } from "../store/CartSlice"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../store/productSlice"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Products({ searchProducts }) {

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState();

    const dispatch = useDispatch()
    const data = useSelector((state) => state)
    console.log(data, "data");
    const { data: productList, status } = useSelector((state) => state.product)

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleAdd = (val) => {
        dispatch(add(val))
    }
    function handlesort(e) {
        setSort(e.target.value)
    }
    const handleSearchData = (e) => {
        setSearch(e.target.value);
    };



    const sortedProducts = [...productList].sort((a, b) => {
        if (sort === 'price') {
            return a.price - b.price;
        } else if (sort === 'name') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    const filteredProducts = sortedProducts.filter(product =>
        product.price.toString().includes(search) || product.title.toLowerCase().includes(search.toLowerCase())

    );
    useEffect(() => {
        dispatch(fetchProducts())
        console.log("sortedProducts", sortedProducts);
    }, [])

    return (


        <div>
            <div className='text-center m-3'>
                <input className='m-2'
                    type="text"
                    value={search}
                    onChange={handleSearchData}
                    placeholder="Search product"
                />
            </div>
            <select onChange={handlesort} value={sort} >
                <option value="name"> Name</option>
                <option value="price">Price</option>
            </select><br /><br />


            {
                filteredProducts.map((val, ind) => {
                    return (
                        <React.Fragment key={ind}>

                            <div className="col-3" style={{ display: "inline-block", marginTop: "20px" }}>
                                <div className="container">
                                    <div className="row" style={{ height: "100%" }}>
                                        <Card sx={{ maxWidth: 345, height: "100%" }}>
                                            <CardHeader

                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title={val.title}

                                            />
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={val.images}
                                                alt="Paella dish"
                                            />
                                            <CardContent>
                                                <Typography variant="h5" color="text.secondary">
                                                    {`$${val.price}`}
                                                </Typography>
                                                <Typography variant="body6" color="text.secondary">
                                                    {`${val.creationAt}`}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                                <button onClick={() => handleAdd(val)} style={{ marginLeft: "104px", borderRadius: "12px", padding: "5px 6px", color: "white", backgroundColor: "#1976d2" }}>ADD TO CART</button>
                                            </CardActions>

                                        </Card>
                                    </div>
                                </div>

                            </div>

                        </React.Fragment>
                    )
                })

            }

        </div >
    )

}
