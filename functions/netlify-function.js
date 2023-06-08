import fetch from "node-fetch";

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

  const response = await fetch(chatGptAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIapiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTION",
    },
    body: JSON.stringify(data),
  };
};