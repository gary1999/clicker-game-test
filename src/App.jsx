//npm run deploy
import { useEffect, useState } from "react";
import { easyMonsterList } from "./resources/easyMonsterList";
import { mediumMonsterList } from "./resources/mediumMonsterList";
import { hardMonsterList } from "./resources/hardMonsterList";

import "./App.css";

function App() {
	const [player, setPlayer] = useState({
		name: "Hero",
		health: 10,
		minDamage: 1,
		maxDamage: 3,
		gold: 0,
	});

	const [monster, setMonster] = useState({});
	const [playerDamage, setPlayerDamage] = useState(0);

	const encounterMonster = () => {
		setMonster({
			...easyMonsterList[
				Math.floor(Math.random() * easyMonsterList.length)
			],
		});
		var encounterButton = document.getElementById("encounterButton");
		encounterButton.disabled = true;
	};

	const rollDamage = () => {
		let damage = Math.floor(
			Math.random() * (player.maxDamage - player.minDamage + 1) +
				player.minDamage
		);
		setPlayerDamage((playerDamage) => damage);
		return damage;
	};

	const monsterTakeDamage = () => {
		setMonster({ ...monster, health: monster.health - rollDamage() });
		if (monster.health <= 0) {
			setMonster({ ...monster, health: 0 });
			// var attackButton = document.getElementById("attackButton");
			// attackButton.disabled = true;
		}
	};

	useEffect(() => {
		if (monster.health <= 0 || monster.health == null) {
			var attackButton = document.getElementById("attackButton");
			attackButton.disabled = true;
			var encounterButton = document.getElementById("encounterButton");
			encounterButton.disabled = false;
			setPlayerDamage((playerDamage) => 0);
		} else if (monster.health > 0) {
			var attackButton = document.getElementById("attackButton");
			attackButton.disabled = false;
		}
		// else {
		// 	var encounterButton = document.getElementById("encounterButton");
		// 	encounterButton.disabled = false;
		// }
	}, [monster.health]);

	return (
		<>
			<div id="UI">
				<div id="playerUI">
					<div>{player.name}</div>
					<div>HP: {player.health}</div>
					<div>
						Damage: {player.minDamage} - {player.maxDamage}
					</div>
					<div>Gold: {player.gold}</div>
				</div>
				<div id="monsterUI">
					<div>{monster.name}</div>
					<div>HP: {monster.health}</div>
					<div>Damage: {monster.minDamage}</div>
				</div>
			</div>
			<div id="other">
				<button id="attackButton" onClick={monsterTakeDamage}>
					Attack
				</button>
				<button id="encounterButton" onClick={encounterMonster}>
					Encounter
				</button>
				{monster.health <= 0 ? (
					<>Monster is dead</>
				) : (
					<>You dealt {playerDamage} damage</>
				)}
			</div>
		</>
	);
}

export default App;
