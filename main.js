const questions = [
	{
		question: "Любимое на работе сочетание цветов?",
		answers: ["Белый + зелёный", "Красный + черный", "Черный + бирюзовый", "Зелёный + фиолетовый"],
		correct: 2,
	},
	{
		question: "Моя должность в футбольном клубе Акрон?",
		answers: [
			"Главный по тарелочкам",
			"Специалист по работе с болельщиками",
			"SMM",
			"Тренер по силовой подготовке",
		],
		correct: 2,
	},
	{
		question: "С кем играет ФК Акрон 23 октября в 16:00 на Кристалле в Жигулевске?",
		answers: [
			"СМД",
			"Локо-Эковоз",
			"Тольятти",
			"Рубин",
		],
		correct: 4,
	},
	{
		question: "В каком году я начал работать в ФК Акрон?",
		answers: ["2022", "2021", "2012", "2018"],
		correct: 2,
	},
];

//Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//Переменные игры
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	//Вопрос
	//Создали метку %title% и с помощью replece заменили её значение на значение из массива
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	//Поместили значение переменной title в разметку
	headerContainer.innerHTML = title;

	//Варианты ответов
	let answerNumber = 1;
	for ([index, answersText] of questions[questionIndex]['answers'].entries()) {

		const questionTemplate =
			`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		const answerHTML = questionTemplate
			.replace('%answer%', answersText)
			.replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
};

function checkAnswer() {
	//Находим выбранную радио кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	//Если ответ не выбран - ничего не делаем, выходим из функции
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	//Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	//Если ответ верно - увеличиваем счёт
	console.log(userAnswer, questions[questionIndex]['correct']);
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		console.log('Это НЕ последний вопрос');
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		console.log('Это последний вопрос');
		clearPage();
		showResults();
	}
}

function showResults() {
	console.log('showResults start');
	console.log(score);

	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
		`;

	let title, message;
	//Варианты заголовков ответов и текста
	if (score === questions.length) {
		title = 'Поздравляем';
		message = 'Вы ответили верно на все вопросы<br/> Жду вас на матче 23 октября в 16:00<br/> Вместе обыграем Рубин! Вперёд, Тольятти!<br/> Заходи ещё, будут новые вопросы ;)';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат!';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Стоит постараться';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	let result = `${score} из ${questions.length}`;

	//Финальный ответ
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	//Меняем кнопку на играть снова
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => history.go();
}