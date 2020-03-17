
var Main = {

	init:function() {

		var startBtn = document.getElementById('startBtn');
			startBtn.addEventListener('click', Main.startQuiz);

			if (localStorage.getItem('points') == undefined) {
				localStorage.setItem('points', 0);
			}
			else {
				var pts = localStorage.getItem('points');
				var div = document.getElementById('points');
					div.innerHTML = pts;
			}

	},

	startQuiz:function(e) {
		var btn = e.target;
			btn.parentNode.removeChild(btn);
		var url = 'https://restcountries.eu/rest/v2/';
		var req = new XMLHttpRequest();
		var response;
		var container = document.getElementById('container');
		var divArr = [];

			req.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					response = JSON.parse(req.responseText);


						for (let i = 0; i < response.length; i++) {

							let div = document.createElement('div');
								div.setAttribute('class', 'flagContainer');
								div.setAttribute('id', response[i].name);

							let img = document.createElement('img');
								img.setAttribute('id', response[i].name);
								img.setAttribute('class', 'flag');
								img.src = response[i].flag;

								div.appendChild(img);

							let input = document.createElement('input');
								input.setAttribute('class', 'flagInput');
								input.setAttribute('id', response[i].name);
								input.setAttribute('type', 'text');

								div.appendChild(input);

							let btn = document.createElement('button');
								btn.setAttribute('class', 'confirmBtn');
								btn.innerHTML = 'Svara';
								btn.addEventListener('click', Main.checkAnswer);

								div.appendChild(btn);

								divArr.push(div);
						}

						var array = Main.shuffleArray(divArr);

							for (let i = 0; i < array.length; i++) {
								container.appendChild(array[i]);
							}
				}
			}

			req.open('GET', url, true);
			req.send();
	},

	shuffleArray:function(array) {
	    
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
    	return array;
	},

	checkAnswer:function(e) {

		var target = e.target.parentNode;
		var answ = target.id;
		var correctAnswer = answ.toLowerCase();
		
		var input = target.getElementsByTagName('input')[0].value;
		var btn = target.getElementsByTagName('button')[0];
			btn.disabled = true;

			if (input.length > 3 && correctAnswer.includes(input.toLowerCase())) {
				btn.innerHTML = '✓';
				btn.removeAttribute('class');
				btn.setAttribute('class', 'correct');

			var pts = parseInt(localStorage.getItem('points'));
				pts ++;
				localStorage.setItem('points', pts);
			var div = document.getElementById('points');
				div.innerHTML = pts;
			}

			else {
				btn.innerHTML = correctAnswer;
				btn.removeAttribute('class');
				btn.setAttribute('class', 'wrong');

			var pts = parseInt(localStorage.getItem('points'));
				pts --;
				localStorage.setItem('points', pts);
				var div = document.getElementById('points');
					div.innerHTML = pts;
			}
	}

}

document.addEventListener('DOMContentLoaded', Main.init);