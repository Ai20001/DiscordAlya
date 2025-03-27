# �� Discord Alya Bot

<div align="center">
  <img src="https://i.imgur.com/XxxXxxx.png" alt="Alya Bot Logo" width="200"/>
  <br/>
  <b>Многофункциональный Discord бот с системой уровней, экономикой и модерацией!</b>
</div>

<div align="center">
  <a href="https://github.com/Ai20001/DiscordAlya/stargazers"><img src="https://img.shields.io/github/stars/Ai20001/DiscordAlya?style=for-the-badge&color=yellow" alt="Stars"></a>
  <a href="https://github.com/Ai20001/DiscordAlya/network/members"><img src="https://img.shields.io/github/forks/Ai20001/DiscordAlya?style=for-the-badge&color=orange" alt="Forks"></a>
  <a href="https://github.com/Ai20001/DiscordAlya/issues"><img src="https://img.shields.io/github/issues/Ai20001/DiscordAlya?style=for-the-badge&color=red" alt="Issues"></a>
  <a href="https://github.com/Ai20001/DiscordAlya/pulls"><img src="https://img.shields.io/github/issues-pr/Ai20001/DiscordAlya?style=for-the-badge&color=blue" alt="Pull Requests"></a>
  <a href="https://github.com/Ai20001/DiscordAlya/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Ai20001/DiscordAlya?style=for-the-badge&color=green" alt="License"></a>
  <a href="https://discord.gg/your-server"><img src="https://img.shields.io/discord/YOUR_SERVER_ID?style=for-the-badge&color=purple" alt="Discord"></a>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/discord.js-v14-blue?style=flat-square&logo=discord&logoColor=white" alt="Discord.js">
  <img src="https://img.shields.io/badge/node-%3E%3D%2016.9.0-green?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/npm-8.0.0-blue?style=flat-square&logo=npm&logoColor=white" alt="NPM">
</div>

## ✨ Возможности

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://i.imgur.com/level.png" width="100" height="100" alt="Levels">
        <br/>
        <b>🎮 Система уровней</b>
      </td>
      <td align="center">
        <img src="https://i.imgur.com/economy.png" width="100" height="100" alt="Economy">
        <br/>
        <b>💰 Экономика</b>
      </td>
      <td align="center">
        <img src="https://i.imgur.com/mod.png" width="100" height="100" alt="Moderation">
        <br/>
        <b>🛡️ Модерация</b>
      </td>
      <td align="center">
        <img src="https://i.imgur.com/fun.png" width="100" height="100" alt="Fun">
        <br/>
        <b>🎯 Развлечения</b>
      </td>
    </tr>
  </table>
</div>

### 🎮 Система уровней
- ⭐ Автоматическое начисление опыта
- 🏆 Кастомные карточки рангов
- 🎁 Настраиваемые награды
- 📊 Таблица лидеров

### 💰 Экономика
- 💵 Система валюты
- 🏪 Магазин предметов
- 📅 Ежедневные награды
- 💼 Система работы

### 🛡️ Модерация
- 👮 Управление участниками
- ⚠️ Система предупреждений
- 🤖 Автомодерация
- 📝 Логирование действий

### 🎯 Развлечения
- 🎲 Мини-игры
- 🎉 Розыгрыши
- 📊 Опросы
- 🎱 Рандомные команды

## 🚀 Быстрый старт

### Предварительные требования
- [Node.js](https://nodejs.org/) (версия 16.9.0 или выше)
- [Discord Developer Account](https://discord.com/developers/applications)

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/Ai20001/DiscordAlya.git
cd DiscordAlya
```

2. **Установите зависимости**
```bash
npm install
```

3. **Настройте конфигурацию**
   - Переименуйте `.env.example` в `.env`
   - Заполните необходимые данные:
```env
TOKEN=ваш_токен_бота
CLIENT_ID=id_вашего_приложения
PREFIX=>
OWNER_ID=ваш_id
```

4. **Запустите бота**
```bash
node deploy-commands.js  # Регистрация команд
node index.js           # Запуск бота
```

## 📝 Команды

<div align="center">
  <table>
    <tr>
      <td>
        <h3>🛡️ Модерация</h3>
        <ul>
          <li><code>/ban</code> - Забанить пользователя</li>
          <li><code>/kick</code> - Выгнать пользователя</li>
          <li><code>/warn</code> - Выдать предупреждение</li>
          <li><code>/mute</code> - Замутить пользователя</li>
          <li><code>/unmute</code> - Размутить пользователя</li>
        </ul>
      </td>
      <td>
        <h3>💰 Экономика</h3>
        <ul>
          <li><code>/balance</code> - Проверить баланс</li>
          <li><code>/daily</code> - Получить ежедневную награду</li>
          <li><code>/work</code> - Заработать валюту</li>
          <li><code>/shop</code> - Открыть магазин</li>
          <li><code>/buy</code> - Купить предмет</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>🎮 Уровни</h3>
        <ul>
          <li><code>/rank</code> - Показать ранг</li>
          <li><code>/leaderboard</code> - Таблица лидеров</li>
          <li><code>/rewards</code> - Награды за уровни</li>
        </ul>
      </td>
      <td>
        <h3>🎯 Развлечения</h3>
        <ul>
          <li><code>/poll</code> - Создать опрос</li>
          <li><code>/giveaway</code> - Создать розыгрыш</li>
          <li><code>/8ball</code> - Магический шар</li>
          <li><code>/roll</code> - Бросить кости</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 📚 Документация

Подробная документация доступна в [Wiki](https://github.com/Ai20001/DiscordAlya/wiki)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте изменения в форк (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📜 Лицензия

Распространяется под лицензией MIT. Смотрите [LICENSE](LICENSE) для получения дополнительной информации.

## 📞 Поддержка

<div align="center">
  <a href="https://discord.gg/your-server">
    <img src="https://img.shields.io/discord/YOUR_SERVER_ID?style=for-the-badge&color=purple" alt="Discord">
  </a>
  <a href="https://github.com/Ai20001/DiscordAlya/issues">
    <img src="https://img.shields.io/github/issues/Ai20001/DiscordAlya?style=for-the-badge&color=red" alt="Issues">
  </a>
  <a href="mailto:your-email@example.com">
    <img src="https://img.shields.io/badge/Email-your-email@example.com-blue?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</div>

## 🌟 Звёзды проекта

[![Stargazers repo roster for @Ai20001/DiscordAlya](https://reporoster.com/stars/Ai20001/DiscordAlya)](https://github.com/Ai20001/DiscordAlya/stargazers)

## 🔗 Полезные ссылки

<div align="center">
  <a href="https://discord.js.org/">
    <img src="https://img.shields.io/badge/Discord.js-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord.js">
  </a>
  <a href="https://discord.com/developers/docs">
    <img src="https://img.shields.io/badge/Discord_Developer_Portal-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord Developer">
  </a>
  <a href="https://nodejs.org/docs">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  </a>
</div>

---
<div align="center">
  <img src="https://i.imgur.com/XxxXxxx.png" alt="Alya Bot Logo" width="100"/>
  <br/>
  <b>Сделано с ❤️ для Discord</b>
</div> 