import React,{useCallback} from "react";
import Counter from "../component/Counter";
// import {connect} from 'react-redux';
import {increase, decrease} from '../modules/counter';
import {useSelector, useDispatch} from 'react-redux';

const CounterContainer = ()=>{
    const number = useSelector(state=>state.counter.number);
    const dispatch = useDispatch();
    const handleIncrease = useCallback(()=>dispatch(increase()), [dispatch]);
    const handleDecrease = useCallback(()=>dispatch(decrease()), [dispatch]);

    return (
        <Counter number = {number} onIncrease={handleIncrease} onDecrease={handleDecrease}/>
    );
};

export default (CounterContainer);