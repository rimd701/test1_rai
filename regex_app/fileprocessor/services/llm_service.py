import openai
import os
import re
import logging

logger = logging.getLogger(__name__)

class LLMService:

    @staticmethod
    def analyze_with_llm(description, df):
        """
        Analyze the user-provided description using LLM and return:
        - Identified column
        - Regex pattern
        - Replacement value
        """

        prompt = f"""
        You are given the following dataset:
        {df.head().to_string()}

        Analyze the following request: "{description}"

        Provide the column name to match the pattern, the regex pattern to match the text, and the replacement value in the format:
        Column: <column_name>
        Regex: <regex_pattern>
        Replacement: <replacement_value>
        """

        openai.api_key = os.getenv('OPENAI_API_KEY');

        try:
            logger.info(f"Sending prompt to OpenAI: {prompt[:100]}...")

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500
            )

            llm_response = response['choices'][0]['message']['content'].strip()

            column_name = regex_pattern = replacement_value = None

            column_match = re.search(r'Column: (.+)', llm_response)
            regex_match = re.search(r'Regex: (.+)', llm_response)
            replacement_match = re.search(r'Replacement: (.+)', llm_response)

            if column_match:
                column_name = column_match.group(1).strip()
            if regex_match:
                regex_pattern = regex_match.group(1).strip()
            if replacement_match:
                replacement_value = replacement_match.group(1).strip()

            if not (column_name and regex_pattern and replacement_value):
                logger.error("Error: Could not parse LLM response correctly")
                return None, None, None, "Error: Incomplete response from LLM"

            return column_name, regex_pattern, replacement_value, None

        except openai.error.OpenAIError as e:
            logger.error(f"OpenAI API error: {str(e)}")
            return None, None, None, f"OpenAI API error: {str(e)}"
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return None, None, None, f"An error occurred: {str(e)}"
