# LocalizeMe - Backend

## Sobre o Projeto

O **LocalizeMe** é um aplicativo móvel que permite aos usuários compartilhar e acompanhar suas localizações em tempo real. O backend do projeto foi desenvolvido com o objetivo de fornecer uma API robusta e escalável utilizando **NestJS**. A API interage com o Firebase para armazenar dados de localização e realizar a sincronização em tempo real.

## Funcionalidades

- **API de Localização**: Recebe e envia dados de localização em tempo real entre o frontend e o Firebase.
- **Autenticação de Usuários**: Implementa a autenticação de usuários utilizando Firebase Authentication.
- **Sincronização em Tempo Real**: Conecta-se ao Firebase para permitir a troca de dados de localização em tempo real entre os usuários.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs robustas e escaláveis.
- **Firebase**: Para autenticação de usuários e armazenamento em tempo real dos dados de localização.
- **TypeScript**: Linguagem utilizada para o desenvolvimento do backend.
- **JWT (JSON Web Tokens)**: Para autenticação e controle de sessões de usuários.

## Requisitos

Antes de rodar o projeto, é necessário ter o seguinte instalado:

- **Node.js** (v14 ou superior)
- **NestJS CLI**: Ferramenta de linha de comando do NestJS
- **Firebase**: Conta configurada para autenticação e banco de dados no Firebase

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/IgorGabrielM/localizeme-backend.git
cd localizeme-backend
