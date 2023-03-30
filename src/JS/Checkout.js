// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { infoAction } from '../store/info.slice'
import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
// import { getProducts } from './dataService'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { getInfoProducts } from '../store/info.thunk'

const Product = ({ item }) => {
    const dispatch = useDispatch()
    const incrementPrice = () => {
        const data = {
            id: item.id,
            amount: item.orderedQuantity + 1,
        }

        dispatch(infoAction.increament(data))
        dispatch(infoAction.calculateTotals())
    }
    const decreamentPrice = () => {
        const data = {
            id: item.id,
            amount: item.orderedQuantity - 1,
        }
        dispatch(infoAction.decreament(data))
        dispatch(infoAction.calculateTotals())
    }

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.availableCount}</td>
            <td>${item.price}</td>
            <td>{item.orderedQuantity}</td>
            <td>${Math.round(item.total * 100) / 100 || 0}</td>
            <td>
                <button
                    className={styles.actionButton}
                    onClick={() => incrementPrice()}
                    disabled={item.availableCount <= item.orderedQuantity}
                >
                    +
                </button>
                <button
                    className={styles.actionButton}
                    onClick={() => decreamentPrice()}
                    disabled={item.orderedQuantity <= 0}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const items = useSelector((state) => state.info.items)
    const discount = useSelector((state) => state.info.discount)
    const totalPrices = useSelector((state) => state.info.totalPrices)
    const isLoading = useSelector((state) => state.info.isLoading)
    const error = useSelector((state) => state.info.error)

    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {isLoading && <LoadingIcon />}
                {error && (
                    <h4 style={{ color: 'red' }}>Some thing went wrong</h4>
                )}

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            return (
                                <>
                                    <Product key={item.id} item={item} />
                                </>
                            )
                        })}
                    </tbody>
                </table>
                <h2>Order summary</h2>
                {totalPrices > 1000 && (
                    <p>Discount: ${Math.round(discount * 100) / 100} </p>
                )}
                <p>{`Total:$ ${Math.round(totalPrices * 100) / 100}`}</p>
            </main>
        </div>
    )
}

export default Checkout
