import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from "./component/Loader";
import Layout from "./layout/Layout";
import LandingPage from "./pages/LandingPage";
import MyCards from "./pages/MyCardsPage";

const Routes = () => {
	return (
		<Suspense fallback={Loader}>
			<Switch>
				<Route path='/' exact component={ LandingPage } />
				<Layout>
					<Route path='/my-cards' component={ MyCards } />
				</Layout>
			</Switch>
		</Suspense>
	);
};

export default Routes;
