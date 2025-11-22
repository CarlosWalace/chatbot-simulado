from django.urls import path
from . import views

"""
URLs específicas do app 'chat'.

Por quê separar as URLs?
- Organização: cada app mantém suas próprias rotas
- Reutilização: o app pode ser usado em outros projetos
"""

urlpatterns = [
    path('mensagens/', views.enviar_mensagem, name='enviar_mensagem'),
    path('historico/<str:usuario>/', views.listar_historico, name='listar_historico'),
]