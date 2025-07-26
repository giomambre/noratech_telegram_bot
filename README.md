# Noratech Telegram Bot

This is a Telegram bot for creating and managing work reports. It allows users to input client information, work details, hours, and descriptions, and then sends the data to an ARXivar Next instance.

## Features

- **Create new work reports** with the following information:
  - Client name
  - Type of work (e.g., Analysis, Assistance, Development)
  - Date of work
  - Hours and minutes worked
  - Billable and non-billable hours
  - Description of the work performed
- **View a list of previously submitted reports.**
- **Edit report fields** before final submission.
- **Integration with ARXivar Next Web API** to archive the reports.

### Arxivar Interface

![arxivar interface](https://github.com/decoder338/noratech_telegram_bot/assets/71758759/23118c33-03a4-4321-96aa-aa0c1a9d141e)

### Bot Interface

**Main Menu:**

![bot interface](https://github.com/decoder338/noratech_telegram_bot/assets/71758759/d3e5f2cf-8ca7-4dd9-9a9c-f899b704368a)

**Selecting Work Type:**

![work type](https://github.com/decoder338/noratech_telegram_bot/assets/71758759/174efaa6-86a4-424a-9635-a505bb4de545)

**Editing Data:**

![edit data](https://github.com/decoder338/noratech_telegram_bot/assets/71758759/e285e64a-ca2d-4e7c-b7f2-ab2b5b5f822a)

**Report Summary:**

![report summary](https://github.com/decoder338/noratech_telegram_bot/assets/71758759/e67b8cbb-7ad1-49f6-9d9b-a6d6358c3d6c)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A Telegram Bot Token. You can get one by talking to the [BotFather](https://t.me/botfather).
- Access to an ARXivar Next instance with API credentials.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/noratech_telegram_bot.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd noratech_telegram_bot
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Configure the bot:**
   - Open `codiceBot.js` and replace `"5101055245:AAF8tO4znUcOCs8xf2OCb2vAs1qL8rdrGAE"` with your Telegram Bot Token.
   - In the same file, update the ARXivar API endpoint and credentials:
     ```javascript
     axios.post('http://arxdemo.betsoft-srl.it//ARXivarNextWebApi/api/Authentication', {
         username: "your-arxivar-username",
         password: "your-arxivar-password",
         clientId: "your-arxivar-client-id",
         clientSecret: "your-arxivar-client-secret"
     })
     ```

### Running the Bot

To start the bot, run the following command in your terminal:

```bash
node codiceBot.js
```

## Usage

Once the bot is running, you can interact with it on Telegram:

- **`/start`**: Initializes the bot and shows the main menu.
- **Nuovo rapportino ➕**: Starts the process of creating a new work report. The bot will guide you through the required fields.
- **Guarda rapportini inviati ✅**: Displays a list of all the reports you have submitted.

## Project Structure

```
.
├── codiceBot.js          # Main bot logic and interaction handler
├── mask.json             # (Asked to hide this) ARXivar mask definition
├── README.md             # This file
├── reply_markup.json     # (Asked to hide this) Telegram keyboard layouts
├── user_login_demo.json  # Example of ARXivar login credentials
└── .git/                   # Git version control files
```

## Dependencies

- [telegraf](https://www.npmjs.com/package/telegraf): A library for creating Telegram bots.
- [axios](https://www.npmjs.com/package/axios): A promise-based HTTP client for making requests to the ARXivar API.

## API Integration

The bot integrates with the **ARXivar Next Web API** to store the work reports.

- **Authentication**: The bot authenticates with the ARXivar API using the credentials provided in `codiceBot.js`.
- **Data Submission**: When a user confirms a new report, the bot constructs a JSON payload with the collected data and sends it to the `/api/masks/{mask_id}/profile` endpoint.
- **Mask ID**: The `mask_id` (`bfd3550a6a4743cdab7b17006ef96810`) corresponds to a specific mask in ARXivar designed to store the "Rapporto di intervento Telegram".
