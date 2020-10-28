
import async from "../component/Async";

const MyCards = async(() => import("../pages/MyCardsPage"));
const Stake = async(() => import("../pages/StakePage"));
const GetHeroes = async(() => import("../pages/GetHeroesPage"));

const menuRoutes = [
	{
		path: '/my-cards',
		component: MyCards
	},
	{
		path: '/stake',
		component: Stake
	},
	{
		path: '/get-heroes',
		component: GetHeroes
	}
];

export {
	menuRoutes
};
