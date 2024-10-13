from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .services.file_processing import FileProcessingService

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file was uploaded"}, status=400)

        pattern_description = request.data.get('pattern_description')
        if not pattern_description:
            return Response({"error": "No pattern description provided"}, status=400)

        # Process the file and pattern using the service
        result, error = FileProcessingService.process_file(file, pattern_description)

        if error:
            return Response({"error": error}, status=400)

        return Response(result)
