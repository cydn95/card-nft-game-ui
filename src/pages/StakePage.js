import React from "react";
import { Tab, Nav } from "react-bootstrap";

const Stake = () => {
	return (
		<Tab.Container id="left-tabs-example" defaultActiveKey="heroes">
			<Nav variant="pills" className="justify-content-center animation-fadeIn">
				<Nav.Item>
					<Nav.Link eventKey="heroes">Stock Heroes</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="villains">Lock Villains</Nav.Link>
				</Nav.Item>
			</Nav>
			<div className="stake-stats d-flex justify-content-center animation-slideDown">
				<div>
					<span className='d-block text-center'>unstake all</span>
				</div>
				<div className="stat">
					<h6>My Staked Strength</h6>
					<p>16</p>
				</div>
				<div className="stat">
					<h6>Total Staked Strength</h6>
					<p>3219</p>
				</div>
				<div className="stat">
					<h6>Claimable NDR</h6>
					<p>1.83</p>
				</div>
				<div>
					<span className='d-block text-center'>claim ndr</span>
				</div>
			</div>
			<Tab.Content>
				<Tab.Pane eventKey="heroes">
					<div className="section-title d-flex justify-content-center animation-fadeInRight">
						<div className="title-wrapper d-flex">
							<div className="title">
								3/4 Card Staked
							</div>
							<div className="title-line">

							</div>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<div className="card-wrapper d-flex flex-column align-items-center animation-hatch">
							<div className="card">
								<img src={`/assets/images/card/card-1.png`} alt="card-1"/>
								<img
									src={`/assets/images/bg/card-menu/card-bg--stake.png`}
									className='card-bg'
									alt="card-bg"
								/>
							</div>
							<button className='hover-effect3'>
								Unstake
							</button>
						</div>
						<div
							className={`card-wrapper d-flex invisible flex-column align-items-center animation-hatch animation-delay-1`}
							onLoad={(e) => {
								const elm = e.currentTarget;
								setTimeout(() => {
									elm.className = `visible ${elm.className}`;
								}, 600);
							}}
						>
							<div className="card">
								<img src={`/assets/images/card/card-1.png`} alt="card-1"/>
								<img
									src={`/assets/images/bg/card-menu/card-bg--stake.png`}
									className='card-bg'
									alt="card-bg"
								/>
							</div>
							<button className='hover-effect3'>
								Unstake
							</button>
						</div>
						<div
							className="card-wrapper invisible d-flex flex-column align-items-center animation-hatch animation-delay-2"
							onLoad={(e) => {
								const elm = e.currentTarget;
								setTimeout(() => {
									elm.className = `visible ${elm.className}`;
								}, 1100);
							}}
						>
							<div className="card">
								<img src={`/assets/images/card/card-1.png`} alt="card-1"/>
								<img
									src={`/assets/images/bg/card-menu/card-bg--stake.png`}
									className='card-bg'
									alt="card-bg"
								/>
							</div>
							<button className='hover-effect3'>
								Unstake
							</button>
						</div>
						<div
							className="card-wrapper unstake invisible d-flex flex-column align-items-center animation-hatch animation-delay-3"
							onLoad={(e) => {
								const elm = e.currentTarget;
								setTimeout(() => {
									elm.className = `visible ${elm.className}`;
								}, 1600);
							}}
						>
							<div className="card">
								<img src={`/assets/images/card/card-1.png`} alt="card-1"/>
								<img
									src={`/assets/images/bg/card-menu/card-bg--unstake.png`}
									className='card-bg'
									alt="card-bg"
								/>
								<img
									src={`/assets/images/bg/card-menu/unstake-layer.png`}
									className='unstake-layer'
									alt="unstake-layer"/>
							</div>
							<button className='hover-effect3'>
								Stake
							</button>
						</div>
					</div>
				</Tab.Pane>
				<Tab.Pane eventKey="villains">
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};

export default Stake;
