from django.db import models

class Mensagem(models.Model):
    """
    Modelo que representa uma mensagem no chat.
    
    Por quê este modelo?
    - usuario: Identifica quem enviou (A ou B)
    - conteudo: O texto da mensagem
    - resposta: A resposta automática gerada
    - timestamp: Quando foi criada (automático)
    """
    USUARIO_CHOICES = [
        ('A', 'Usuário A'),
        ('B', 'Usuário B'),
    ]
    
    usuario = models.CharField(
        max_length=1, 
        choices=USUARIO_CHOICES,
        help_text="Identifica se a mensagem é do Usuário A ou B"
    )
    conteudo = models.TextField(
        help_text="Conteúdo da mensagem enviada pelo usuário"
    )
    resposta = models.TextField(
        help_text="Resposta automática gerada pelo sistema"
    )
    timestamp = models.DateTimeField(
        auto_now_add=True,
        help_text="Data e hora da criação da mensagem"
    )
    
    class Meta:
        ordering = ['-timestamp']  # Ordenar por mais recente primeiro
        verbose_name = 'Mensagem'
        verbose_name_plural = 'Mensagens'
    
    def __str__(self):
        return f"{self.get_usuario_display()} - {self.timestamp.strftime('%d/%m/%Y %H:%M')}"