import pandas as pd
import re
from .llm_service import LLMService
from django.core.files.uploadedfile import TemporaryUploadedFile
import logging

logger = logging.getLogger(__name__)

class FileProcessingService:

    @staticmethod
    def process_file(file, pattern_description):
        file_type = file.name.split('.')[-1]

        try:
            if file_type == 'csv':
                df = pd.read_csv(file, chunksize=10000)  # Read in chunks for large files
            elif file_type in ['xls', 'xlsx']:
                df = pd.read_excel(file, chunksize=10000)
            else:
                return None, "Unsupported file type"

            # Combine chunks into a single DataFrame (if necessary)
            df = pd.concat(df)

        except Exception as e:
            logger.error(f"Failed to read the file: {str(e)}")
            return None, f"Failed to read the file: {str(e)}"

        # Use LLM to analyze the pattern description
        column_name, regex_pattern, replacement_value, error_message = LLMService.analyze_with_llm(pattern_description, df)

        if error_message:
            return None, error_message

        if column_name is None or regex_pattern is None or replacement_value is None:
            return None, "Failed to analyze the input. Please try again."

        try:
            # Apply the regex substitution on the DataFrame
            df[column_name] = df[column_name].apply(lambda x: re.sub(regex_pattern, replacement_value, str(x)))
        except KeyError:
            return None, f"Column '{column_name}' not found in the dataset"
        except Exception as e:
            logger.error(f"Failed to process the data: {str(e)}")
            return None, f"Failed to process the data: {str(e)}"

        # Ensure no null values
        df = df.fillna('')

        # Return data as a dict (or as chunks if still large)
        return df.to_dict(orient='records'), None
