from django.test import TestCase
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
import json

class FileUploadViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.csv_content = b"ID,Name,Email,Number\n1,John Doe,john.doe@example.com,no1\n2,Jane Smith,jane_smith@domain.com,no2\n3,Alice Brown,alice.brown@website.org,no3\n"
    
    def test_replace_email_domain(self):
        """
        Test case for replacing the domain of emails from '@example.com' to '@test.com'
        """
        test_file = SimpleUploadedFile("test.csv", self.csv_content, content_type="text/csv")
        
        response = self.client.post(
            'http://localhost:8000/api/upload/',
            {
                'file': test_file,
                'pattern_description': 'Replace @example.com with @test.com in the Email column.'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, 200)
        expected_data = [
            {"ID": 1, "Name": "John Doe", "Email": "john.doe@test.com", "Number": "no1"},
            {"ID": 2, "Name": "Jane Smith", "Email": "jane_smith@domain.com", "Number": "no2"},
            {"ID": 3, "Name": "Alice Brown", "Email": "alice.brown@website.org", "Number": "no3"}
        ]
        self.assertJSONEqual(json.dumps(response.json()), expected_data)

    def test_replace_numbers_in_number_column(self):
        """
        Test case for replacing 'no1', 'no2', etc. in the 'Number' column with '##'
        """
        test_file = SimpleUploadedFile("test.csv", self.csv_content, content_type="text/csv")
        
        response = self.client.post(
            'http://localhost:8000/api/upload/',
            {
                'file': test_file,
                'pattern_description': 'Replace no1, no2, etc. in the Number column with ##.'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, 200)
        expected_data = [
            {"ID": 1, "Name": "John Doe", "Email": "john.doe@example.com", "Number": "##"},
            {"ID": 2, "Name": "Jane Smith", "Email": "jane_smith@domain.com", "Number": "##"},
            {"ID": 3, "Name": "Alice Brown", "Email": "alice.brown@website.org", "Number": "##"}
        ]
        self.assertJSONEqual(json.dumps(response.json()), expected_data)

    def test_unsupported_file_type(self):
        """
        Test case for uploading an unsupported file type (e.g., .txt)
        """
        txt_content = b"Some random text content"
        test_file = SimpleUploadedFile("test.txt", txt_content, content_type="text/plain")
        
        response = self.client.post(
            'http://localhost:8000/api/upload/',
            {
                'file': test_file,
                'pattern_description': 'Some pattern description'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Unsupported file type"})

    def test_missing_file(self):
        """
        Test case for a POST request with no file provided.
        """
        response = self.client.post(
            'http://localhost:8000/api/upload/', 
            {
                'pattern_description': 'Some pattern description'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "No file was uploaded"})

    def test_missing_pattern_description(self):
        """
        Test case for missing pattern description in the request.
        """
        test_file = SimpleUploadedFile("test.csv", self.csv_content, content_type="text/csv")
        
        response = self.client.post(
            'http://localhost:8000/api/upload/', 
            {
                'file': test_file
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "No pattern description provided"})
