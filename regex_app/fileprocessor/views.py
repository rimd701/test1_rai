from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from dotenv import load_dotenv
import pandas as pd
import openai
import re
import logging
import os

load_dotenv()
# Set up logging
logger = logging.getLogger(__name__)

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file was uploaded"}, status=400)

        file_type = file.name.split('.')[-1]

        try:
            if file_type == 'csv':
                df = pd.read_csv(file)
            elif file_type in ['xls', 'xlsx']:
                df = pd.read_excel(file)
            else:
                return Response({"error": "Unsupported file type"}, status=400)
        except Exception as e:
            return Response({"error": f"Failed to read the file: {str(e)}"}, status=400)

        pattern_description = request.data.get('pattern_description')
        if not pattern_description:
            return Response({"error": "No pattern description provided"}, status=400)

        column_name, regex_pattern, replacement_value, error_message = self.analyze_with_llm(pattern_description, df)

        if error_message:
            return Response({"error": error_message}, status=400)

        if column_name is None or regex_pattern is None or replacement_value is None:
            return Response({"error": "Failed to analyze the input. Please try again."}, status=400)

        try:
            df[column_name] = df[column_name].apply(lambda x: re.sub(regex_pattern, replacement_value, str(x)))
        except KeyError:
            return Response({"error": f"Column '{column_name}' not found in the dataset"}, status=400)
        except Exception as e:
            return Response({"error": f"Failed to process the data: {str(e)}"}, status=500)

        df = df.fillna('')

        return Response(df.to_dict(orient='records'))

    def analyze_with_llm(self, description, df):
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
        openai.api_key = os.getenv("OPENAI_API_KEY")

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
            print(column_match)
            print(regex_match)
            print(replacement_match)
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
