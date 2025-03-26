# 🎵 Discord Alya Music Bot

[![License](https://img.shields.io/github/license/Ai20001/DiscordAlya)](https://github.com/Ai20001/DiscordAlya/blob/master/LICENSE)
[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org)
[![Node](https://img.shields.io/badge/node-%3E%3D%2016.9.0-green.svg)](https://nodejs.org)

<div align="center">
  <img src="https://i.imgur.com/XxxXxxx.png" alt="Alya Bot Logo" width="200"/>
  <br/>
  <b>Многофункциональный музыкальный бот для Discord с поддержкой YouTube, плейлистов и крутыми эффектами!</b>
</div>

## ✨ Возможности

- 🎵 **Музыка из разных источников**
  - YouTube
  - Spotify (скоро)
  - SoundCloud (скоро)

- 📋 **Продвинутое управление плейлистами**
  - Сохранение любимых треков
  - Загрузка плейлистов
  - Управление очередью

- 🎚️ **Настройка звука**
  - Регулировка громкости
  - Эквалайзер
  - Эффекты (bassboost, nightcore, 8D)

- 🔄 **Удобное управление**
  - Простые команды
  - Интуитивный интерфейс
  - Автоматическое подключение

## 🚀 Быстрый старт

### Предварительные требования

- [Node.js](https://nodejs.org/) (версия 16.9.0 или выше)
- [FFmpeg](https://ffmpeg.org/)
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
PREFIX=!
OWNER_ID=ваш_id
```

4. **Запустите бота**
```bash
node deploy-commands.js  # Регистрация команд
node index.js           # Запуск бота
```

## 📝 Команды

### Основные команды
| Команда | Описание |
|---------|----------|
| `/play` | Воспроизвести трек или плейлист |
| `/stop` | Остановить воспроизведение |
| `/skip` | Пропустить текущий трек |
| `/queue` | Показать очередь |
| `/pause` | Приостановить воспроизведение |
| `/resume` | Возобновить воспроизведение |

### Управление звуком
| Команда | Описание |
|---------|----------|
| `/volume` | Установить громкость (0-200%) |
| `/bass` | Усиление баса |
| `/nightcore` | Эффект Nightcore |
| `/8d` | Объемный звук |

### Плейлисты
| Команда | Описание |
|---------|----------|
| `/playlist` | Управление плейлистами |
| `/save` | Сохранить текущую очередь |
| `/load` | Загрузить плейлист |
| `/favorites` | Показать избранное |

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

- [Discord сервер поддержки](https://discord.gg/your-server)
- [Создать Issue](https://github.com/Ai20001/DiscordAlya/issues)
- [Email поддержки](mailto:your-email@example.com)

## 🌟 Звёзды проекта

[![Stargazers repo roster for @Ai20001/DiscordAlya](https://reporoster.com/stars/Ai20001/DiscordAlya)](https://github.com/Ai20001/DiscordAlya/stargazers)

## 🔗 Полезные ссылки

- [Discord.js Документация](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Node.js Документация](https://nodejs.org/docs) 