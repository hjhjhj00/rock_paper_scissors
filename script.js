// helper
const log = (element) => console.log(element);
const qsAll = (target) => document.querySelectorAll(target);
const qs = (target) => document.querySelector(target);

// selector
const playerGroup = qs('.player-group');
const computerGroup = qs('.computer-group');
const playerBtns = qsAll('.player-select');
const computerBtns = qsAll('.computer-select');
const result = qs('.result');
const roundView = qs('.round');
const recordGameView = qs('.result-record-view');

let playerSelect;
let computerSelect;
let round =0;
let scissor=10;
let scissorWin=10;
let rock=10;
let rockWin=10;
let paper=10;
let paperWin=10;

// 각 선택 값 저장
let recordPlayer = [];
let recordComputer = [];

// 승패 저장
let recordGame = [];

// functions
// 랜덤 정수 발생
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

// 컴퓨터 패 처리
const computerGetInt = () => {
	computerBtns.forEach((btn) => btn.classList.remove('select'));
	if(round<3){
		computerSelect = getRandomIntInclusive(0, 2);
	}else{
		computerSelect=nextNum;
	}
	//console.log("computerSelect"+computerSelect)
	computerBtns[computerSelect].classList.add('select');
	recordComputer.push(computerSelect);
};

// 결과값 처리
const computerWin = () => {
	result.textContent = 'Computer';
	recordGame.push('computer');
	computerGroup.classList.add('winner');
	playerGroup.classList.remove('winner');
	//winner class 추가/제거
	const liElem = document.createElement('li');
	liElem.textContent = 'Computer';
	recordGameView.appendChild(liElem);
};
const playerWin = () => {
	result.textContent = 'Player';
	recordGame.push('player');
	playerGroup.classList.add('winner');
	computerGroup.classList.remove('winner');
	//winner class 추가/제거
	const liElem = document.createElement('li');
	liElem.textContent = 'Player';
	recordGameView.appendChild(liElem);
};
const draw = () => {
	result.textContent = 'DRAW';
	recordGame.push('draw');
	playerGroup.classList.remove('winner');
	computerGroup.classList.remove('winner');
	const liElem = document.createElement('li');
	liElem.textContent = 'Draw';
	recordGameView.appendChild(liElem);
};

// 10라운드 끝
const gameEnd = () => {
	if (round === 10) {
		alert('10번 게임이 끝났습니다. 새로 시작합니다.');
		location.reload();
	}
};

// 컴퓨터 랜덤 패 고르고, 배열에 넣고, 승패 결정
const game = () => {
	computerGetInt();
	if (playerSelect === computerSelect) {
		draw();
		switch(computerSelect){
			case 0:
				scissor++;
				rock++;
				paper++;
			case 1:
				scissor++;
				rock++;
				paper++;
			case 2:
				scissor++;
				rock++;
				paper++;
				
		}
	} else if (playerSelect === 0) {
		switch (computerSelect) {
			case 1:
				computerWin();
				scissor++;
				rock++;
				paper++;
				rockWin++;
				break;
			case 2:
				playerWin();
				scissor++;
				rock++;
				paper++;
				paperWin--;
				break;
		}
	} else if (playerSelect === 1) {
		switch (computerSelect) {
			case 0:
				playerWin();
				scissor++;
				rock++;
				paper++;
				scissorWin--;			
				break;
			case 2:
				computerWin();
				scissor++;
				rock++;
				paper++;
				paperWin++;
				break;
		}
	} else if (playerSelect === 2) {
		switch (computerSelect) {
			case 0:
				computerWin();
				scissor++;
				rock++;
				paper++;
				scissorWin++;
				break;
			case 1:
				playerWin();
				scissor++;
				rock++;
				paper++;
				rockWin--;
				break;
		}
	}
};

let btn;
var Srate;
var Rrate;
var Prate;
var max;
var nextNum;
	playerBtns.forEach(btns=>{
		btns.addEventListener('click', event => {
			gameEnd();//10번 지났으면 reload
			let target=event.target
			if(target.innerText=="가위"){
				btn=0;
				//console.log("btn:"+btn);
			}else if(target.innerText=="바위"){
				btn=1;
				//console.log("btn:"+btn);
			}else if(target.innerText=="보"){
				btn=2;
				//console.log("btn:"+btn);
			}
			playerSelect=btn;
			game();
			recordPlayer.push(playerSelect);
			round++;
			roundView.textContent = round;
			log(`computerSelects = ${recordComputer}`);
			//computerGetInt의 computer select를 recordComputer에  추가.
			log(`playerSelects = ${recordPlayer}`);
			//recordPlayer에 추가.
			Srate=scissorWin
			Rrate=rockWin
			Prate=paperWin
			log(`scissor점수 = ${Srate}`)
			log(`rock점수 = ${Rrate}`)
			log(`paper점수 = ${Prate}`)

			max=Math.max(Srate,Rrate,Prate)
			console.log("max:"+max)
			if(max==Srate){
				nextNum=0;
			}else if(max==Rrate){
				nextNum=1;
			}else if(max==Prate){
				nextNum=2;
			}
			if(Srate==Rrate==Prate==max){
				nextNum=getRandomIntInclusive(0, 2);
			}else if(Srate==Rrate==max){
				nextNum=getRandomIntInclusive(0,1);
			}else if(Rrate==Prate==max){
				nextNum=getRandomIntInclusive(1,2);
			}else if(Srate==Prate==max){
				nextNum=getRandomIntInclusive(0,2);
				while(nextNum==1){
					nextNum=getRandomIntInclusive(0,2);
				}
				//nextNum=getRandomIntInclusive();
			}
			console.log("nextNum: "+nextNum)
			console.log(round+"round ends.")
		})})
		
		