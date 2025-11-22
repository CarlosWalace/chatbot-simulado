from rest_framework import serializers
from .models import Mensagem

class MensagemSerializer(serializers.ModelSerializer):
    """
    Serializer para converter objetos Mensagem em JSON e vice-versa.
    
    Por quê usar serializer?
    - Converte dados Python (objetos Django) em JSON para a API
    - Valida dados recebidos do frontend
    - Simplifica a criação de APIs REST
    """
    
    class Meta:
        model = Mensagem
        fields = ['id', 'usuario', 'conteudo', 'resposta', 'timestamp']
        read_only_fields = ['id', 'resposta', 'timestamp']
        # id, resposta e timestamp são gerados automaticamente