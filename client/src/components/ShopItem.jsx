import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../redux/actions/cartActions'
import { userAlert } from '../utils/alerts'

const ShopItem = ({ data }) => {
    const dispatch = useDispatch();

    const handleClick = product => {
        addToCart(dispatch, {
            ...product,
            color: product.color[0],
            size: product.size[0],
            qty: 1
        })
            .then(e => userAlert('info', 'Item added to your cart: ', e))
            .catch(() => userAlert('danger', 'An error occurred. Please try again', ''));
    }

    return (
        <div className='col-sm-6 col-lg-3'>
            <div className='product'>
                <Link to={`../product/${data._id}`}>
                    <img src={data.img} alt={data.name} />
                </Link>
                <div className='desc'>
                    <div className='categories'>
                        {data.categories.map(e => (
                            <Link to={`../shop?category=${e}`} key={e}><span>{e}</span></Link>
                        ))}
                    </div>
                    <h5><Link to={`../product/${data._id}`}>{data.name}</Link></h5>
                    <div className='star'>
                        {[...Array(5).keys()].map(e => <i className='fa-solid fa-star' key={e}></i>)}
                    </div>
                    <h4>${data.price}</h4>
                </div>
                <button onClick={() => handleClick(data)} disabled={!data.countInStock}>
                    <i className='fa-solid fa-cart-plus cart-p'></i>
                </button>
            </div>
        </div>
    )
}

export default ShopItem
