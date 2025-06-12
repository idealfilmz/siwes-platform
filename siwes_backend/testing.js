class AiModelCheckAnswer {
    constructor(data = []) {
        // Expecting an array of { topic, explanation } objects
        this.data = data;
        this.questions = [];
    }

    isValidData() {
        if (!Array.isArray(this.data) || this.data.length === 0) {
            console.log("At least one topic with explanation is required.");
            return false;
        }
        return true;
    }

    generateQuestions() {
        if (!this.isValidData()) return;

        this.questions = this.data.map(({ topic, explanation }) => {
            const fakeOptions = this.generateFakeOptions(explanation);
            const shuffledOptions = this.shuffleOptions([...fakeOptions, explanation]);

            return {
                question: `What best explains: "${topic}"?`,
                options: shuffledOptions,
                correctAnswer: explanation
            };
        });

        this.printQuestions();
    }

    generateFakeOptions(correctExplanation) {
        // In real-world use, you'd use NLP or an AI model to generate these
        return [
            "An unrelated explanation",
            "Another misleading idea",
            "A partially true statement"
        ];
    }

    shuffleOptions(options) {
        return options.sort(() => Math.random() - 0.5);
    }

    printQuestions() {
        console.log("Generated Questions:");
        this.questions.forEach((q, index) => {
            console.log(`\nQ${index + 1}: ${q.question}`);
            q.options.forEach((opt, i) => {
                console.log(`   ${String.fromCharCode(65 + i)}. ${opt}`);
            });
            console.log(`   Answer: ${q.correctAnswer}`);
        });
    }
}


const topicsData = [
    { topic: "Machine Learning", explanation: "Algorithms that improve from data without explicit programming" },
    { topic: "Neural Networks", explanation: "A structure of algorithms inspired by the human brain" },
    { topic: "Overfitting", explanation: "When a model performs well on training data but poorly on new data" }
];

const quiz = new AiModelCheckAnswer(topicsData);
quiz.generateQuestions();
