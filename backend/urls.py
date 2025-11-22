from django.contrib import admin
from django.urls import path, include

"""
URLs principais do projeto Django.

Por quê usar include()?
- Delega as URLs do app 'chat' para seu próprio arquivo
- Mantém o código organizado e modular
"""

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('chat.urls')),  # Todas as URLs do chat começam com /api/
]