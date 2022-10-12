const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
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
		console.log(index+1, answersText);

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

function checkAnswer () {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	console.log(checkedRadio);

	if (!checkedRadio){
		submitBtn.blur();
		return
	};
}