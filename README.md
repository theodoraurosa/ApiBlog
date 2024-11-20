# Meta Blog

## RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar um usuário com informações como `name`, `email`, `password`, e `role` (definindo o tipo de acesso do usuário).
- [x] Deve ser possível autenticar o usuário utilizando `email` e `password`, fornecendo um token JWT em caso de sucesso.
- [x] Deve ser possível obter o perfil de um usuário autenticado, incluindo detalhes como `name`, `email`, `role`.
- [x] Deve ser possível cadastrar uma categoria com um `name` único e uma `description` opcional, para organizar os posts. 
- [ ] Deve ser possível editar uma categoria existente, permitindo a alteração de seu `name` e `description`. 
- [x] Deve ser possível obter uma categoria específica pelo `id`, incluindo dados como `name`, `description`, e todos os `posts` associados.
- [x] Deve ser possível listar múltiplas categorias, paginadas com 20 itens por página.
- [x] Deve ser possível excluir uma categoria, respeitando restrições caso contenha posts ou comentários.
- [ ] Deve ser possível criar um post associado a um usuario e uma categoria, com informações como `title`, `slug`, `description`, `image_url`, `num_likes`, e `num_views`.
- [ ] Deve ser possível editar um post existente, permitindo a atualização de seu título, descrição, imagem, e categoria.
- [ ] Deve ser possível obter um post específico com informações detalhadas, incluindo o autor, categoria, e comentários.
- [ ] Deve ser possível listar vários posts, paginados com 20 itens por página, e ordenados por visualizações ou curtidas.
- [ ] Deve ser possível excluir um post, com as restrições de deletar também os comentários associados.
- [ ] Deve ser possível cadastrar um comentário vinculado a um post específico e ao usuário que comentou, incluindo a `description`.
- [ ] Deve ser possível editar um comentário existente, permitindo a atualização de seu conteúdo (`description`).
- [ ] Deve ser possível obter detalhes de um comentário específico.
- [ ] Deve ser possível excluir um comentário, com restrições para proteger a integridade do post.

## RNs (Regras de Negócio)

- [x] O `email` do usuário deve ser único, impedindo o cadastro com e-mails duplicados.
- [x] Somente usuários autenticados podem criar, editar ou excluir categorias.
- [ ] O campo `name` da categoria deve ser único, evitando a criação de categorias duplicadas.
- [ ] Somente o autor de um post pode editá-lo ou excluí-lo.
- [ ] O `role` do usuário deve ser verificado para que permissões de administração sejam concedidas, permitindo acesso completo para gerenciar categorias e posts.
- [ ] Somente o autor de um comentário pode editá-lo ou excluí-lo.
- [ ] Um usuário só pode acessar seu próprio perfil, a menos que possua permissões de administrador.
- [ ] Comentários e categorias que estão em uso (associados a um post) não podem ser excluídos até que as associações sejam removidas.
- [x] Apenas usuários autenticados podem adicionar ou editar comentários.
- [ ] A atualização de `num_likes` e `num_views` dos posts deve ser restrita para evitar manipulação de contagens e refletir apenas ações reais de usuários.
- [ ] A exclusão de categorias só será permitida se não houver posts ativos ou comentários vinculados a elas.

## RNFs (Requisitos Não-Funcionais)

- [x] A senha do usuário deve ser armazenada de forma segura, utilizando criptografia.
- [x] Todos os dados da aplicação devem ser persistidos em um banco de dados PostgreSQL.
- [ ] As listas de dados, como categorias, posts e comentários, devem ser paginadas, com um limite padrão de 20 itens por página.
- [ ] O sistema deve utilizar autenticação baseada em JWT (JSON Web Token) para identificar e autorizar usuários.
- [ ] O `slug` dos posts deve ser gerado automaticamente a partir do `title`, seguindo um padrão amigável para URLs.