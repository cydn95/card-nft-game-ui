
import async from "../component/Async";

const MyCards = async(() => import("../pages/MyCardsPage"));
const Stake = async(() => import("../pages/StakePage"));

const menuRoutes = [
	{
		path: '/my-cards',
		component: MyCards
	},
	{
		path: '/stake',
		component: Stake
	}
];

export {
	menuRoutes
};
