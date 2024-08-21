import React, { useEffect } from 'react';
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from "../actions/restaurantAction";
import Restaurant from "../component/Restaurant";
import Loader from "../component/layout/Loader";
import Message from "../component/Message";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from 'react-router-dom';


const Home = () => {
    const dispatch = useDispatch();
    const {keyword } = useParams();
    const {
        loading: restaurantsLoading,
        error: restaurantsError,
        restaurants,
        showVegOnly,
    } = useSelector((state) => state.restaurants);

    useEffect(() => {
        if (restaurantsError) {
            return alert.error(restaurantsError);
        }
        dispatch(getRestaurants(keyword));
    }, [dispatch, restaurantsError, keyword])

    const handleSortByRatings = () => {
        dispatch(sortByRatings());
    };

    const handleSortByReview = () => {
        dispatch(sortByReviews());
    };

    const handleToggleVegOnly = () => {
        dispatch(toggleVegOnly());
    };

    return (
        <>
        
            {restaurantsLoading ? (
                <Loader/>
            ) : restaurantsError ? (
                <Message varient="danger">{restaurantsError}</Message>
            ) : (
                <>
                    <section>
                        <div className="sort">
                        <button className="sort_veg p-3" onClick={handleToggleVegOnly }
                        >
                            {showVegOnly ?"Show All":""}

                        </button>
                        <button className="sort_rev p-3" onClick={handleSortByReview}>Sort By Reviews
                        </button>
                        <button className="sort_rate p-3" onClick={ handleSortByRatings}> Sort By ratings</button>    
                        </div>
                        < div className="row mt-4">
                            {restaurants && restaurants.restaurants ? (
                                restaurants.restaurants.map((restaurant) =>
                                !showVegOnly||(showVegOnly&& restaurant.isVeg)? (
                                    <Restaurant key={restaurant._id} restaurant={restaurant} />

                                ):null
                                )
                            ) : (
                                <Message varient="info">No restaurants Found.</Message>
                            )}
                        </div>
                    </section>
                </>


            )}



        </>
    );
}

export default Home;
