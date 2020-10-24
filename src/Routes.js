import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from "./component/Loader";
import LandingPage from "./pages/LandingPage";

const Routes = () => {
	return (
		<Suspense fallback={Loader}>
			<Switch>
				<Route path='/' exact component={ LandingPage } />
			</Switch>
		</Suspense>
	);
};

export default Routes;
