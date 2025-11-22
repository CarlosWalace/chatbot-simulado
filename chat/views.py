from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Mensagem
from .serializers import MensagemSerializer

@api_view(['POST'])
def enviar_mensagem(request):
    """
    Endpoint para receber uma nova mensagem.
    
    Recebe:
    - usuario: "A" ou "B"
    - conteudo: texto da mensagem
    
    Retorna:
    - A mensagem salva com a resposta gerada
    
    Por quê POST? 
    - POST é usado para criar novos recursos no servidor
    """
    usuario = request.data.get('usuario')
    conteudo = request.data.get('conteudo')
    
    # Validação básica
    if not usuario or not conteudo:
        return Response(
            {'erro': 'Usuário e conteúdo são obrigatórios'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Gerar resposta mockada baseada no usuário
    if usuario == 'A':
        resposta = "Obrigado pelo contato, Usuário A! Retornaremos em breve com uma resposta personalizada."
    elif usuario == 'B':
        resposta = "Agradecemos sua mensagem, Usuário B! Nossa equipe analisará e responderá em breve."
    else:
        return Response(
            {'erro': 'Usuário inválido. Use "A" ou "B".'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Criar e salvar a mensagem
    mensagem = Mensagem.objects.create(
        usuario=usuario,
        conteudo=conteudo,
        resposta=resposta
    )
    
    # Serializar e retornar
    serializer = MensagemSerializer(mensagem)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def listar_historico(request, usuario):
    """
    Endpoint para buscar o histórico de um usuário específico.
    
    Parâmetro de URL:
    - usuario: "A" ou "B"
    
    Retorna:
    - Lista de mensagens do usuário em ordem cronológica reversa
    
    Por quê GET?
    - GET é usado para recuperar dados sem modificar o servidor
    """
    if usuario not in ['A', 'B']:
        return Response(
            {'erro': 'Usuário inválido. Use "A" ou "B".'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Buscar mensagens do usuário específico
    mensagens = Mensagem.objects.filter(usuario=usuario)
    
    # Serializar a lista de mensagens
    serializer = MensagemSerializer(mensagens, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)