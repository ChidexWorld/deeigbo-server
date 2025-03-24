# DeeIgbo Translator - Backend

## 🎉 Welcome to DeeIgbo Translator Backend
An Express.js server that powers the Igbo-to-English translation service.

## 🏫 Class Group Project
This project was developed as part of a class group project, with **Igboanugo Chidera Goodness** as the software engineer.

## 🌟 Features
- 🌍 **Translate text** from Igbo to English.
- 🎙️ **Text-to-Speech (TTS)** for Igbo and English (via Hugging Face API).
- 🗣️ **Speech-to-Text (STT)** for English (handled on the frontend).
- 🔄 **REST API** for seamless integration with the frontend.
- 🛠️ **Error handling** with proper status codes and messages.
- 📊 **Logging** with Morgan for monitoring API usage.
- ⚡ **Fast and scalable performance**.

## 📦 Technologies Used
- **Express.js** - Backend framework.
- **Hugging Face API** - Machine translation & TTS.
- **CORS** - Handling cross-origin requests.
- **dotenv** - Managing environment variables.
- **Firebase** - Handling feedback storage.
- **Morgan** - Logging API requests.

## 🔗 API Endpoints
### 📌 POST `/translate`
Translate Igbo text to English.

### 📌 POST `/tts`
Convert text to speech (Igbo & English via Hugging Face).

## 📌 Example API Requests & Responses

### 1️⃣ Translate Text (Igbo to English)
#### Endpoint: `POST /translate`
#### Request:
```json
{
  "text": "kedụ ka ị mere?"
}
```
#### Response:
```json
{
  "translatedText": "How are you?"
}
```

### 2️⃣ Text-to-Speech (TTS)
#### Endpoint: `POST /tts`
#### Request:
```json
{
  "text": "Ndewo",
  "language": "ig"
}
```
#### Response:
```json
{
  "audioUrl": "https://huggingface.co/audio/sample.mp3"
}
```

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ChidexWorld/deeigbo-server.git
cd deeigbo-server
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the project root and add:
```env
PORT=5000
HUGGINGFACE_API_KEY=your_huggingface_api_key
```
Replace `your_huggingface_api_key` with the actual value.

### 4️⃣ Start the Server
```sh
npm start
```
The server should now be running on `http://localhost:5000/`.

## 🌐 Deployment
### Deploy on Render
1. Push your changes to GitHub.
2. Create a new project on Render.
3. Connect your GitHub repository.
4. Add environment variables in Render settings.
5. Deploy and obtain the live API URL.

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit changes (`git commit -m 'Added new feature'`).
4. Push to GitHub (`git push origin feature-name`).
5. Create a Pull Request.

## 📜 License
This project is MIT licensed. Feel free to modify and share!

## 🙌 Credits
- **Hugging Face** - For providing the translation and TTS model.
- **Firebase** - For handling feedback storage.

