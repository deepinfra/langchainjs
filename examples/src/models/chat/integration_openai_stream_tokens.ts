import { AIMessageChunk } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

// Instantiate the model
const model = new ChatOpenAI();

const response = await model.stream("Hello, how are you?", {
  // Pass the stream options
  stream_options: {
    include_usage: true,
  },
});

// Iterate over the response, only saving the last chunk
let finalResult: AIMessageChunk | undefined;
for await (const chunk of response) {
  if (finalResult) {
    finalResult = finalResult.concat(chunk);
  } else {
    finalResult = chunk;
  }
}

console.log(finalResult?.usage_metadata);

/*

{ input_tokens: 13, output_tokens: 30, total_tokens: 43 }

*/
