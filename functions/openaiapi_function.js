import axios from "axios";

exports.handler = async function(event, context) {
  const { prompt } = JSON.parse(event.body);
  const chatGptAPI = "https://api.openai.com/v1/chat/completions";
  const openAIapiKey = process.env.OPENAI_API_KEY;

  const requestBody = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant that provides accurate and useful answers to user questions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.85,
    n: 1,
    frequency_penalty: 0.2,
  };

  try {
    const response = await axios.post(chatGptAPI, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIapiKey}`,
      },
    });

    const data = response.data;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(`Error: ${error.message}`);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    };
  }
}